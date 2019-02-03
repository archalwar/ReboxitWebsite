import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl ,FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { element } from '@angular/core/src/render3/instructions';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sd',
  templateUrl: './sd.component.html',
  styleUrls: ['./sd.component.css']
})
export class SdComponent implements OnInit {
  associateDetails;
  assignedPickups=[];
  products=[];
  finalcost=[];
  productDetails={};
  universalcart={};
  lastIndex;
  companyname: any;

  constructor(private formBuilder : FormBuilder,private router:Router,private db:AngularFirestore,private modalService: NgbModal,private auth:AuthService){
  }


  open(content,id) 
  {
    this.lastIndex=id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
    });
    var cart=JSON.parse(this.assignedPickups[id].cart);
    for(var m in this.universalcart)
    {
      if(cart[m])
      this.universalcart[m]=cart[m][0];
      else
      this.universalcart[m]=0;
    }
    console.log("updated univ cart is",this.universalcart);
  }
  ngOnInit()
  {
    this.companyname=JSON.parse(localStorage.getItem("user"))["companyname"];
    this.associateDetails=JSON.parse(localStorage.getItem("user"));
    this.db.collection("pickup_user",ref => ref.where("assigned","==",true).where("assignedTo","==",this.associateDetails["id"]).where("collected","==",false)).snapshotChanges().subscribe(res => {
      for(var i=0;i<res.length;i++)
      {
        var k=res[i].payload.doc.data();
        k["id"]=res[i].payload.doc.id;
        this.assignedPickups.push(k);
        this.finalcost[i]=this.assignedPickups[i]["totalamt"];
      }
    });


    this.db.collection("products").snapshotChanges().subscribe(res => {
      for(var i=0;i<res.length;i++)
      {
        var cat=res[i].payload.doc.data();
        for(var m in cat)
        {
          if(m.search("thumb")== -1)
          {
            this.productDetails[m]=cat[m];
            this.universalcart[m]=0;
            this.products.push(m);
          }
        }
      }
    });
    console.log(this.products);
    console.log(this.assignedPickups);
  }
  showCart()
  {
    console.log(this.universalcart);
  }
  updateCost()
  {
    var sum=0;
    for (var m in this.universalcart)
    {
      sum=sum+this.universalcart[m]*this.productDetails[m];
   }
   this.finalcost[this.lastIndex]=sum;
   this.assignedPickups[this.lastIndex]["cart"]=this.universalcart;
  }
  async submit(k)
  {
    this.assignedPickups[k]["collected"]=true;
    this.assignedPickups[k]["cart"]=JSON.stringify(this.assignedPickups[k]["cart"]);
    this.assignedPickups[k]["totalamt"]=this.finalcost[k];
    await this.db.doc("pickup_user/"+this.assignedPickups[k].id).update(this.assignedPickups[k]).then(function(){
      console.log("successful");
    });
     window.location.reload();
  }
  logout()
  {
    this.auth.logout();
  }
}