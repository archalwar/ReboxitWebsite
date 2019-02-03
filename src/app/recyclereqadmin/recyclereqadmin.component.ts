import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recyclereqadmin',
  templateUrl: './recyclereqadmin.component.html',
  styleUrls: ['./recyclereqadmin.component.css']
})
export class RecyclereqadminComponent implements OnInit {
  pickupForm:FormGroup;
  username:string;
  states;
  location=[];
  cart={};
  prods=[];
  companyname;
  user;
  constructor(private formBuilder : FormBuilder,private authService: AuthService,private db:AngularFirestore,private router:Router) { }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    this.companyname=this.user["companyname"];
    this.pickupForm = this.formBuilder.group({
    });
    console.log("mew",JSON.parse(localStorage.getItem("user")));
    this.states=["Andhra Pradesh","Arunachal Pradesh ","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Lakshadweep","National Capital Territory of Delhi","Puducherry"];
    this.db.collection("locations").snapshotChanges().subscribe(res =>{
      for(var i in res)
      {
        this.location.push(res[i].payload.doc.id);
      }
    })

    this.prods.push(this.user["scrapetype"]);
    this.pickupForm.addControl(this.user["scrapetype"],new FormControl('',Validators.required));
    this.cart[this.user["scrapetype"]]=0;
  }



  

  onSubmit()
  {

      for(var m in this.cart)
      {
        if(this.cart[m]>0)
        {
          var u=JSON.parse(localStorage.getItem("user"));
          var req={};
          req["scraptype"]=u["scrapetype"];
          req["totalwt"]=this.cart[m];
          req["name"]=u["username"];
          req["email"]=u["email"];
          req["phone"]=u["phone"];
          req["address"]=u["address"];
          req["userid"]=u["id"];
          req["location"]=u["location"];
          if(u["pincode"])
            req["pincode"]=u["pincode"];
          this.db.collection("pickup_rec").add(req).then(res => {
            console.log("uploaded",req);
            window.location.reload();
          });
        }
      }
      
    
  }
  logout()
  {
    this.authService.logout(); 
  }

}
