import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart=[];
  totalamt=0;
  totalkg=0;
  cm;
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit() 
  {

    var meh=JSON.parse(localStorage.getItem("cart"));
    this.cm=0;
    if(meh)
      for(var g in meh)
      {
        this.cm++;
      }
    for(var i in meh)
    {
      this.cart.push([i,meh[i][0],meh[i][1]]);
    }
    console.log(this.cart);

    for(var i in this.cart)
    {
      this.totalkg+=this.cart[i][1];
      this.totalamt+=this.cart[i][1]*this.cart[i][2];
    }
  }
  proceedTocheck()
  {
    this.router.navigate(["/checkout"]);
  }
  logout()
  {
    this.authService.logout();
  }
  del(index)
  {
    delete this.cart[index];
    var k={}
    for(var g in this.cart)
    {
      k[this.cart[g][0]]=[this.cart[g][1],this.cart[g][2]];
    }
    localStorage.setItem("cart",JSON.stringify(k));
    window.location.reload();
  }
}
