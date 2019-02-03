import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  dataForm:boolean=false;
  addForm :boolean=false;


  constructor() { }

  ngOnInit() {}
  

  showAddForm(valid:boolean){
    this.addForm=true;
    this.dataForm=false;
  }
  showDataForm(valid:boolean){
    this.addForm=false;
    this.dataForm=true;
  }

}
