import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.css']
})
export class AddlocationComponent implements OnInit {
  pickupForm: any;
  pro;

  constructor(private formBuilder : FormBuilder,private authService: AuthService,private db:AngularFirestore,private router:Router) { }

  ngOnInit() {

    this.pickupForm = this.formBuilder.group({
      location: ['', Validators.required]
    });
  }
  add()
  {
    this.db.collection("locations").doc(this.pro).set({}).then(function(){
      console.log("added");
      window.location.reload();
    });
  }
  logout()
  {
    this.authService.logout();
  }
}
