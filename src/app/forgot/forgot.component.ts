import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup ,FormControl ,FormBuilder , Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  loginForm : FormGroup;
 
  constructor(private router:Router , private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      
      phone: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required]
  });
  }

  showLogin(){
    this.router.navigate(['/design']);
  }
  showSignup(){
    this.router.navigate(['/signup']);
  }
  showAsso(){
    this.router.navigate(['/associate']);
  }
  
}
