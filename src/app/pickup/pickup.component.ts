import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl ,FormBuilder , Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css']
})
export class PickupComponent implements OnInit {
   pickupForm:FormGroup;
   username:string;
   states;
   location=[];
  constructor(private formBuilder : FormBuilder,private authService: AuthService,private db:AngularFirestore,private router:Router) { 
  }

  ngOnInit() {
    this.pickupForm = this.formBuilder.group({
      location: ['0', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['0', Validators.required],
      slot:['0',Validators.required],
      phone:['',Validators.required],
      altphone:['']
    });
    console.log("mew",JSON.parse(localStorage.getItem("user")));
    this.states=["Andhra Pradesh","Arunachal Pradesh ","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Lakshadweep","National Capital Territory of Delhi","Puducherry"];
    this.db.collection("locations").snapshotChanges().subscribe(res =>{
      for(var i in res)
      {
        this.location.push(res[i].payload.doc.id);
      }
    })
  }

  logout()
  {
    this.authService.logout();
  }
  pack()
  {
    var pro=new Promise((resolve,reject)=>{
      var details=this.pickupForm.value;
      console.log(details);
      localStorage.setItem("pickup_details",JSON.stringify(details));
      localStorage.setItem("cm",JSON.stringify(0));
      console.log("rerouting");
      resolve("done");
    });
    return pro;
  }
  async onSubmit()
  {
    this.pack().then(res =>{this.router.navigate(["collections"]);});
  }

}
