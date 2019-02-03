import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-adminrec',
  templateUrl: './adminrec.component.html',
  styleUrls: ['./adminrec.component.css']
})
export class AdminrecComponent implements OnInit {
  pickup=[];
  assTypeSelect=[]; //stores type of associate for each row
  Recycler=[];
  Aggregator=[];



  constructor(private db:AngularFirestore,private router:Router,private modalService: NgbModal,private auth:AuthService) { 
    this.db.collection("pickup_rec").snapshotChanges().subscribe(res => {
      for(var i in res)
      {
        this.pickup.push(res[i].payload.doc.data());
        this.pickup[i]["id"]=res[i].payload.doc.id;
      }
    });
  }
  
  ngOnInit() 
  { 
  }
  logout()
  {
    this.auth.logout();
  }
}
