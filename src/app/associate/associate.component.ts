import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup ,FormControl ,FormBuilder , Validators} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase'
@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {
  associateForm : FormGroup;

  constructor(private router:Router ,private formBuilder:FormBuilder,private db:AngularFirestore,private authService: AuthService) { }
  prods=[];
  location=[];
  ngOnInit() {
    this.associateForm = this.formBuilder.group({
      usertype: ['0', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      companyname: ['', Validators.required],
      doctype: ['0', Validators.required],
      address: ['', Validators.required],
      scrapetype : ['0', Validators.required],
      phone :['',Validators.required],
      location:['0',Validators.required],
      pincode:['',Validators.required]
  });

  this.db.collection("locations").snapshotChanges().subscribe(res =>{
    for(var i in res)
    {
      this.location.push(res[i].payload.doc.id);
    }
  })

  this.db.collection("products").snapshotChanges().subscribe(
    res => {
      for(var i =0 ;i< res.length;i++)
      {
        this.prods.push(res[i].payload.doc.id)
      }
    }
  )
  }


  upfile($event)
  {
    console.log($event);
    let fire=firebase.storage().ref("ids/"+this.associateForm.value.email).put($event.target.files[0]);
    fire.on(firebase.storage.TaskEvent.STATE_CHANGED,(snap)=>{
      console.log((snap["bytesTransferred"] / snap["totalBytes"]) * 100);
    },(error) => {console.log(error)});
  }
  
  showLogin(){
    this.router.navigate(['/design']);
  }
  showSignup(){
    this.router.navigate(['/signup']);
  }
  showAsso(){
    this.router.navigate(['/associate']);
  }
  onSubmit()
  {
    this.authService.signUp(this.associateForm.value.email,this.associateForm.value.password)
    .then((res)=>{
      console.log("authentication created");
      var details=this.associateForm.value;
      details["role"]="associate";
      const obj=this.db.collection('user_website').add(details)
      .then((res) => {
        console.log("data uploaded");
        this.db.collection("user_website", ref => ref.where("email","==",this.associateForm.value.email)).snapshotChanges().
        subscribe(resu => {
          console.log("resu",resu);
          var k=resu[0].payload.doc.data();
          var id=resu[0].payload.doc.id;
          k["id"]=id;
          localStorage.setItem("user",JSON.stringify(k));
          this.router.navigate(['/design']);

        });
    })
      .catch((err) =>  { console.log(err);});
    })
    .catch((err)=>{console.log(err);}); 
  }
}
  
