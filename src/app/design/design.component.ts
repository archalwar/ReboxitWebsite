import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup ,FormControl ,FormBuilder , Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

  loginForm : FormGroup;
  error: any;
 
  constructor(private router:Router , private formBuilder : FormBuilder,private authService: AuthService,private db:AngularFirestore) { }

  ngOnInit() {
    if(localStorage.getItem("user"))
    {
      var resi2=JSON.parse(localStorage.getItem("user"));
      console.log(resi2);
      if(resi2["role"]=="admin")
      {
        localStorage.setItem("user",JSON.stringify(resi2));
        this.router.navigate(["admin"]);        
      }
      else if(resi2["role"] == "associate")
            {
              localStorage.setItem("user",JSON.stringify(resi2));
              if(resi2["usertype"] == "Scrap")
              {
                this.router.navigate(['/scrape']);
              }
              else if(resi2["usertype"]== "Recycler")
              {
                this.router.navigate(['/recycler']);
              }
              else
              {
                this.router.navigate(['/aggregator']);
              }
              
            }
            else
            {
              console.log("dint match");
              localStorage.setItem("user",JSON.stringify(resi2));
              this.router.navigate(['/pickup']);
            }









    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
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
    this.authService.signInRegular(this.loginForm.value.email, this.loginForm.value.password)
        .then((res) => {
          console.log("auth",res);
          console.log("successful");
          this.db.collection("user_website",ref => ref.where('email','==',this.loginForm.value.email))
          .snapshotChanges()
          .subscribe(res2 => 
          {
            var id=res2[0].payload.doc.id;
            var resi2=res2[0].payload.doc.data();
            resi2["id"]=id;
            console.log(res2);
            if(resi2["role"]=="admin")
            {
              localStorage.setItem("user",JSON.stringify(resi2));
              this.router.navigate(["admin"]);
            }
            else if(resi2["role"] == "associate")
            {
              localStorage.setItem("user",JSON.stringify(resi2));
              if(resi2["usertype"] == "Scrap")
              {
                this.router.navigate(['/scrape']);
              }
              else if(resi2["usertype"]== "Recycler")
              {
                this.router.navigate(['/recycler']);
              }
              else
              {
                this.router.navigate(['/aggregator']);
              }
              
            }
            else
            {
              console.log("dint match");
              localStorage.setItem("user",JSON.stringify(resi2));
              this.router.navigate(['/pickup']);
            }
          });
        })
        .catch((err) => {
          console.log('error: ' + err);
          this.error=err;
        });
  }
}
