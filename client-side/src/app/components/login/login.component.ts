import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: {};
  user = {
    email: '',
    password: ''
  }
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  // getUser() {
  //   console.log('done!')
  //   console.log(this.user);
  // }
  // get diagnostic() { return this.user.email; }
  checkUser() {
    //event.preventDefault();
    const email = this.user.email;
    const password = this.user.password;
    // need to pass to server later
    console.log(email);
    console.log(password);

    const url = 'http://' + window.location.hostname + ':3001/auth/login';
    const request = new Request(
      url,
      {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content.Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.user.email,
          password: this.user.password
        })
    });
    fetch(request).then(response => {
      console.log(response.json());
      if(response.status === 200) {
        this.errors = {};
        response.json().then(json => {
          console.log(json);
          this.auth.authenticateUser(json.token, email);
          window.location.replace('/');
        })
      } 
      else {
        console.log('Login failed');
        response.json().then(json => {
          const errors = json.errors ? json.error: {};
          errors['summary'] = json.message;
        })
      }
    } 
    )
  }
}
