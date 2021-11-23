import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  isLoading = false;

  constructor() {}

  ngOnInit(): void {}

  login() {
    // Simulation
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 1000);
  }
}
