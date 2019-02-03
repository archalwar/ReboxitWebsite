import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;


  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) { 
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }
  signInRegular(email,password)
  {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password ); 
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email,password)
  {
    return firebase.auth().createUserWithEmailAndPassword(email,password);
  }
  isLoggedIn()
  {
    if (this.userDetails == null ) {
        return false;
      } else {
        return true;
      }
  }
  logout() 
  {
    this._firebaseAuth.auth.signOut()
    .then((res) => {
      console.log("signed out successfully");
      localStorage.removeItem("user");
      this.router.navigate(["/design"]);
    });
  }


}
