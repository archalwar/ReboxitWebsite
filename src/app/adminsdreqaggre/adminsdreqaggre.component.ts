import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-adminsdreqaggre',
  templateUrl: './adminsdreqaggre.component.html',
  styleUrls: ['./adminsdreqaggre.component.css']
})
export class AdminsdreqaggreComponent implements OnInit{
  pickup=[];
  assTypeSelect=[]; //stores type of associate for each row
  Recycler=[];
  Aggregator=[];

  asstype=["Recycler","Aggregator"];
  assSelect=[]; //actual associated
  associate=[];

  option_meh;

  uniType;
  uniAss;
  lastindex;
  uni=[];
  start=true;


  constructor(private db:AngularFirestore,private router:Router,private modalService: NgbModal,private auth:AuthService) { 

    
    this.db.collection("pickup_sd",ref => ref.where("assigned","==",false)).snapshotChanges().subscribe(res => {
      for(var i in res)
      {
        this.pickup.push(res[i].payload.doc.data());
        this.pickup[i]["id"]=res[i].payload.doc.id;
      }
    });
    
    this.db.collection("user_website").snapshotChanges().subscribe(res2 =>{
      for(var j in res2)
      {
        this.associate.push(res2[j].payload.doc.data());
        this.associate[j]["id"]=res2[j].payload.doc.id;
      }
    });
  }
  open(content,id) 
  {
    if(this.start)
    {
      this.update();
      this.start=false;
    }
    else
    {
    }
    this.lastindex=id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
    });
    this.uniAss=this.assSelect[id];
    this.uniType=this.assTypeSelect[id];
    this.option_meh=this.Recycler[id];
    console.log(id);
    console.log(this.asstype);
    console.log(this.associate);
  }
  ngOnInit() 
  { 
  }

  update()
  {
    console.log(this.associate);
    for(var i in this.pickup)
    {
      this.Recycler.push([]);
      this.Aggregator.push([]);
      for(var j in this.associate)
      {
        if(this.associate[j]["usertype"]!="Scrap" && this.pickup[i]["location"] == this.associate[j]["location"]  && this.pickup[i]["scraptype"] == this.associate[j]["scrapetype"])
        {
          // console.log(i,j,this[this.associate[j]["usertype"]][i]);
          this[this.associate[j]["usertype"]][i].push([this.associate[j]["id"],this.associate[j]["companyname"],this.associate[j]["scrapetype"]]);
        }
      }
    }
    for(var i in this.pickup)
      {
        this.assTypeSelect.push(null);
          this.assSelect.push(null);
      }

    
    // console.log("rec",this.Recycler);
    // console.log("aggre",this.Aggregator);
  }
  updateList()
  {
    this.option_meh=this[this.uniType][this.lastindex];
    this.assTypeSelect[this.lastindex]=this.uniType;
    this.uniAss=null;
    
    this.assSelect[this.lastindex]=null;
    console.log("unia",this.uniAss);
    console.log("unitype",this.uniType);
  }
  updateAss()
  {
    this.assSelect[this.lastindex]=this.uniAss;
    console.log(this.assSelect);
    console.log(this.assTypeSelect);
  }
  submit(idx)
  {
    if(this.assSelect[idx])
    {
      this.pickup[idx]["assigned"]=true;
      this.pickup[idx]["assignedTo"]=this.assSelect[idx];
      this.db.collection("pickup_sd").doc(this.pickup[idx]["id"]).update(this.pickup[idx]).then(res =>{console.log("yeah");

      window.location.reload();
    
    });
    }
    else{
      alert("select a associate before");
    }
  }
  logout()
  {
    this.auth.logout();
  }
}
