import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  name;
  email="";
  phone="";
  address="";
  slot="";
  totalkg;
  totalamt;
  upi;
  bank;
  paytm;
  cash;
  alter;
  cm;
  constructor(private router:Router,private db:AngularFirestore,private authService:AuthService) { }

  ngOnInit() {
    this.cm=0;
    var user=JSON.parse(localStorage.getItem("user"));
    var cart=JSON.parse(localStorage.getItem("cart"));
    if(cart)
    for(var g in cart)
    {
      this.cm++;
    }
    var pickup=JSON.parse(localStorage.getItem("pickup_details"));
    if(!user || !cart || !pickup)
      this.router.navigate(["/design"]);
    console.log(pickup);
    console.log("cart",cart);
    this.name=user.username;
    this.email=user.email;
    this.phone=pickup.phone;
    this.alter=pickup.altphone;
    this.address=pickup.address+", "+pickup.city+", "+pickup.state;
    this.slot=pickup.slot;  
    this.totalamt=0;
    this.totalkg=0;
    for(var i in cart)
    {
      this.totalkg+=cart[i][0];
      this.totalamt+=(cart[i][0]*cart[i][1]);
    }

  }
  showUpi(){
    this.upi=true;
    this.bank=false;
    this.paytm=false;
    this.cash=false;
  }
  showBank(){
    this.upi=false;
    this.paytm=false;
    this.bank=true;
    this.cash=false;
  }
  showPaytm(){
    this.bank=false;
    this.upi=false;
    this.paytm=true;
    this.cash=false;
  }
  showCash()
  {
    console.log("cash caalled");
    this.cash=true;
    this.upi=false;
    this.paytm=false;
    this.cash=false;
  }

  loadData()
  {
    var data=new Object()
    if(this.upi)
    {
      data["payment"]="upi";
      data["upino"]=(document.getElementById("upino") as HTMLInputElement).value;
    }
    else if(this.paytm)
    {
      data["payment"]="paytm";
      data["paytmno"]=(document.getElementById("paytmno") as HTMLInputElement).value;
    }
    else if(this.bank)
    {
      data["payment"]="bank";
      data["bank"]=(document.getElementById("acbank") as HTMLInputElement).value;
      data["accountno"]=(document.getElementById("acno") as HTMLInputElement).value;
      data["ifsc_code"]=(document.getElementById("acifsc") as HTMLInputElement).value;
      data["account_name"]=(document.getElementById("acname") as HTMLInputElement).value;
    }
    else
    {
      data["payment"]="cash";
    }
    data["name"]=this.name;
    data["slot"]=this.slot;
    data["address"]=this.address;
    data["email"]=this.email;
    data["phone"]=this.phone;
    data["alterphone"]=this.alter;
    data["totalwt"]=this.totalkg;
    data["totalamt"]=this.totalamt;
    data["assigned"]=false;
    data["assignedTo"]="";
    data["collected"]=false;
    data["cart"]=localStorage.getItem("cart");
    data["role"]=JSON.parse(localStorage.getItem("user"))["role"];
    data["userid"]=JSON.parse(localStorage.getItem("user"))["id"];
    data["location"]=JSON.parse(localStorage.getItem("pickup_details"))["location"];
    if(data["role"] == "associate")
      data["usertype"]=JSON.parse(localStorage.getItem("user"))["usertype"];
    console.log(data);

    this.db.collection("pickup_user").add(data).then(res => { console.log("successful");
    localStorage.removeItem("pickup_details");
    localStorage.removeItem("cart");
  });

  }
  async submitData()
  {
    await this.loadData();
    var user=JSON.parse(localStorage.getItem("user"));
    if(user["role"]=="user")
    this.router.navigate(["pickup"]);
    else
    {
      if(user["usertype"]=="Scrap")
      this.router.navigate(["/scrape"]);
      else if(user["usertype"]=="Recycler")
      {
        this.router.navigate(["/recycler"])
      }
      else
      {
        this.router.navigate(["/aggregator"])

      }
    }
  }
  logout()
  {
    this.authService.logout();
  }

}
