import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  active = 'top';

  public IsAdmin:boolean;

  constructor() {
    this.IsAdmin = false;
   }

  ngOnInit(): void {
    if (sessionStorage.getItem('role') === 'Admin') {
      this.IsAdmin = true;
    }
    else {
      this.IsAdmin = false;
    }

    console.log(this.IsAdmin);
  }

}
