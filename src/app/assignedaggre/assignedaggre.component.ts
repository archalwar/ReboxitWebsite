import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assignedaggre',
  templateUrl: './assignedaggre.component.html',
  styleUrls: ['./assignedaggre.component.css']
})
export class AssignedaggreComponent implements OnInit 
{
  user;
  assAggregators=[];
  aggreDetails=[];
  companyname: any;
  constructor(private db:AngularFirestore,private auth:AuthService,private router:Router,private modalService: NgbModal) {

   }

  ngOnInit() {
    this.companyname=JSON.parse(localStorage.getItem("user"))["companyname"];

    this.user=JSON.parse(localStorage.getItem("user"));
    // console.log(this.user);

    this.db.collection("pickup_sd",ref => ref.where("userid","==",this.user["id"]).where("assigned","==",true)).snapshotChanges().subscribe(
      res => {
        for(var m in res)
        {
          var k=res[m].payload.doc.data();
          this.assAggregators.push(k);
          this.db.collection("user_website").doc(k["assignedTo"]).snapshotChanges().subscribe(
            res2 => {
              // console.log(res2.payload.data());
              
              if(res2.payload.exists)
              {
                this.aggreDetails.push(res2.payload.data());
              }
            }
          );
        }
      }
    );
    console.log(this.assAggregators);
    console.log(this.aggreDetails);

  }
  
  logout()
  {
    this.auth.logout();
  }
}
