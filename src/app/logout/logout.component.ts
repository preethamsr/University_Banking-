import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
    localStorage.removeItem('username')
    this.route.navigateByUrl('http://localhost:4200/')
  }
}