import { Component, OnInit ,Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  @Input() uname:String;
  categories=[];
  cm;
  constructor(private db:AngularFirestore,private router:Router,private authService:AuthService) {}

  ngOnInit() {
    var meh=JSON.parse(localStorage.getItem("cart"));
    this.cm=0;
    if(meh)
      for(var g in meh)
      {
        this.cm++;
      }
    
    console.log("pickup_details",JSON.parse(localStorage.getItem("pickup_details")));
    this.db.collection("products").snapshotChanges().subscribe(res => {
      for(var i=0;i<res.length;i++)
      {
        if(res[i].payload.doc.exists)
        {
          this.categories.push([res[i].payload.doc.id,res[i].payload.doc.data()["thumb"]]);
          console.log(res[i].payload.doc.id,res[i].payload.doc.data());
        }
      }
    });
  }
  subcol(k)
  {
    console.log(k);
    this.router.navigate(["/subcollections",k]);
  }
  logout()
  {
    this.authService.logout();
  }

}
