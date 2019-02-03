import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit 
{
  pickup=[];
  assTypeSelect=[]; //stores type of associate for each row
  Scrap=[];
  Recycler=[];
  Aggregator=[];

  asstype=["Scrap","Recycler","Aggregator"];
  assSelectOptions=[]; //options for each row
  assSelect=[]; //actual associated

  constructor(private db:AngularFirestore,private router:Router,private auth:AuthService) 
  {

  }

  ngOnInit() 
  {
    this.db.collection("pickup_user",ref => ref.where("assigned","==",false)).snapshotChanges().subscribe(res => {
      for(var i=0;i<res.length;i++)
      {
        this.pickup.push(res[i].payload.doc.data());
        this.pickup[i]["id"]=res[i].payload.doc.id;
        this.assTypeSelect.push(this.asstype[0]);
      }

      this.db.collection("user_website",ref => ref.where("role","==","associate")).snapshotChanges().subscribe(res => {
        for(var i=0;i<res.length;i++)
        {
          this[res[i].payload.doc.data()["usertype"]].push([res[i].payload.doc.data()["companyname"],res[i].payload.doc.id]);
        }
        for(var i=0;i<this.pickup.length;i++)
        {
          // console.log("-->",this.assTypeSelect[i]);
          this.assSelectOptions.push(this[this.assTypeSelect[i]]);
          this.assSelect[i]=this.assSelectOptions[i][0];
        }
      });
    });

    
    // console.log(this.pickup.length);

    console.log(this.pickup);
    console.log("asstype",this.asstype);
    console.log("ass select options",this.assSelectOptions);
    console.log("ass type selected",this.assTypeSelect);
    console.log("Ass selected",this.assSelect);
    // console.log(this.Scrap);
    // console.log(this.Aggregator);
    // console.log(this.Recycler);

    
  }
  updateType(i)
  {
    console.log(this.assTypeSelect);
    this.assSelectOptions[i]=this[this.assTypeSelect[i]];
    this.assSelect[i]=this.assSelectOptions[i][0];
    console.log(this.assSelect);
  }
  updateAss()
  {
    console.log(this.assSelect);
  }
  async submit(k)
  {
    this.pickup[k].assigned =true;
    this.pickup[k].assignedTo =this.assSelect[k][1];
    await this.db.doc("pickup_user/"+this.pickup[k].id).update(this.pickup[k]);
    window.location.reload();
  }
  logout()
  {
    this.auth.logout();
  }
}
