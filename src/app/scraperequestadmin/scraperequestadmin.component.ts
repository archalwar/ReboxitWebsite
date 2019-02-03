import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl ,FormBuilder , Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scraperequestadmin',
  templateUrl: './scraperequestadmin.component.html',
  styleUrls: ['./scraperequestadmin.component.css']
})
export class ScraperequestadminComponent implements OnInit {
  pickupForm:FormGroup;
  username:string;
  states;
  location=[];
  cart={};
  prods=[];
  companyname;
  constructor(private formBuilder : FormBuilder,private authService: AuthService,private db:AngularFirestore,private router:Router) { }

  ngOnInit() {
    this.pickupForm = this.formBuilder.group({
    });

    this.companyname=JSON.parse(localStorage.getItem("user"))["companyname"];
    console.log("mew",JSON.parse(localStorage.getItem("user")));
    this.db.collection("products").snapshotChanges().subscribe(
      res => {
        for(var i =0 ;i< res.length;i++)
        {
          this.prods.push(res[i].payload.doc.id)
          this.pickupForm.addControl(res[i].payload.doc.id,new FormControl('',Validators.required));
          this.cart[res[i].payload.doc.id]=0;
        }
      }
    )

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
        req["assigned"]=false;
        req["assignedTo"]="";
        req["collected"]=false;

        if(u["pincode"])
          req["pincode"]= u["pincode"];
        this.db.collection("pickup_sd").add(req).then(res => {
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
