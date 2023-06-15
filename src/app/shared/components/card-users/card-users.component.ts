import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-users',
  templateUrl: './card-users.component.html',
  styleUrls: ['./card-users.component.scss']
})
export class CardUsersComponent implements OnInit {
  public listUsers!: any
  
  ngOnInit(): void {
    let array = [];

   for (let i = 1; i <= 20; i++) {
  array.push(i);
  this.listUsers = array
   }
}
}
