import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sub-collection',
  templateUrl: './sub-collection.component.html',
  styleUrls: ['./sub-collection.component.css']
})
export class SubCollectionComponent implements OnInit {
  subcats=[];
  title;
  cm;
  constructor(private router:Router,private db:AngularFirestore) { }

  ngOnInit() 
  {
    var meh=JSON.parse(localStorage.getItem("cart"));
    this.cm=0;
    if(meh)
      for(var m in meh)
      {
        this.cm++;
      }
    console.log("cm",this.cm);
    console.log("meh",meh);
    var id= this.router.url.split("/");
    console.log(id[2]);
    this.title=id[2];
    this.db.collection("products").doc(id[2]).get().subscribe(res => {
      if(res.exists)
      {
        for(var k in res.data())
        {
          if(k != "thumb"  && (k.search("_thumb")==-1))
          {
           if(meh && k in meh)
           {
            this.subcats.push([k,res.data()[k],meh[k][0],res.data()[k+"_thumb"]]);
           }
           else
           {
            this.subcats.push([k,res.data()[k],0,res.data()[k+"_thumb"]]);
           } 
          }
        }
      }
  });
  console.log(this.subcats);
}
  decreaseValue(m)
  {
    console.log(m);
    if(m[2]!=0)
    {
      m[2]--;
      this.cm--;
    }
    this.pack();
  }
  increaseValue(m)
  {
    console.log(m);
      m[2]++;
    this.pack();   
  }
  addMore()
  {
    this.pack();
    this.router.navigate(["/collections"]);
  }
  pack()
  {
    var m={};
    if(localStorage.getItem("cart"))
      m=JSON.parse(localStorage.getItem("cart"));
    for(var i=0;i<this.subcats.length;i++)
    {
      var pro=this.subcats[i][0];
      var qua=this.subcats[i][2];
      var price=this.subcats[i][1];
      m[pro]=[qua,price];
    }
    for(var k in m)
    {
      if(m[k][0] == 0)
      {
        delete m[k];
      }
    }
    localStorage.setItem("cart",JSON.stringify(m));
    this.cm=0;
    for(var g in m)
    {
      this.cm++;
    }
  }
  async proceedToCart()
  {
    await this.pack();
    console.log("rerouting");
    this.router.navigate(["/cart"]);
  }

}
