import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recycler',
  templateUrl: './recycler.component.html',
  styleUrls: ['./recycler.component.css']
})
export class RecyclerComponent implements OnInit {
  
  associateDetails;
  assignedPickups=[];
  finalcost=[];
  finalwt=[];
  lastIndex;
  companyname;
  item;
  currwt;
  currscrape;
  constructor(private formBuilder : FormBuilder,private router:Router,private db:AngularFirestore,private modalService: NgbModal,private auth:AuthService) { }

  open(content,id) 
  {
    this.currscrape=this.associateDetails["scrapetype"];
    this.currwt=this.finalwt[id];
    this.item = this.assignedPickups[id]["scrapetype"];
    this.lastIndex = id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
    });
  }

  ngOnInit()
  {
    this.associateDetails=JSON.parse(localStorage.getItem("user"));
    this.companyname=this.associateDetails["companyname"];
    
    this.db.collection("pickup_sd",ref => ref.where("assigned","==",true).where("assignedTo","==",this.associateDetails["id"]).where("collected","==",false))
    .snapshotChanges().subscribe(res => {
      for(var i=0;i<res.length;i++)
      {
        var k=res[i].payload.doc.data();
        k["id"]=res[i].payload.doc.id;
        this.assignedPickups.push(k);
        this.finalcost.push(this.assignedPickups[i]["totalamt"]);
        this.finalwt.push(this.assignedPickups[i]["totalwt"]);
      }
    });

    this.db.collection("pickup_aggre",ref => ref.where("assigned","==",true).where("assignedTo","==",this.associateDetails["id"]).where("collected","==",false))
    .snapshotChanges().subscribe(res => {
      for(var i=0;i<res.length;i++)
      {
        var k=res[i].payload.doc.data();
        k["id"]=res[i].payload.doc.id;
        this.assignedPickups.push(k);
        this.finalcost.push(this.assignedPickups[i]["totalamt"]);
        this.finalwt.push(this.assignedPickups[i]["totalwt"]);  
      }
    });

    console.log(this.assignedPickups);
  }
  showCart()
  {
    this.finalwt[this.lastIndex]=this.currwt;
    this.finalcost[this.lastIndex]=this.finalwt[this.lastIndex]*10;
  }
  updateCost()
  {
  }
  async submit(k)
  {
    this.assignedPickups[k]["collected"]=true;
    this.assignedPickups[k]["totalamt"]=this.finalcost[k];
    this.assignedPickups[k]["totalwt"]=this.finalwt[k];
    await this.db.doc("pickup_sd/"+this.assignedPickups[k].id).update(this.assignedPickups[k]).then(function(){
      console.log("successful");
      window.location.reload();
    }).catch(function(){});
    await this.db.doc("pickup_aggre/"+this.assignedPickups[k].id).update(this.assignedPickups[k]).then(function(){
      console.log("successful");
      window.location.reload();
    }).catch(function(){});
    
  }
  logout()
  {
    this.auth.logout();
  }

}
