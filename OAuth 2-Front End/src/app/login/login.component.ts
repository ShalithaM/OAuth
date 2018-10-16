import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userdetails = { username: '', password: '' }
  auth = false
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + 'YXBwbGljYXRpb246c2VjcmV0')
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded')

    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', this.userdetails.username);
    body.set('password', this.userdetails.password);

    this.http.post('http://localhost:3000/login',
      body.toString(),
      {
        headers: headers
      }).subscribe(
        res => {
          let response;
          response = res;
          console.log(res);

          if (response.code == 400) {
            console.log("Authentication Failed")
            this.auth = true
          }
          else {
            this.auth = false
            this.cookieService.set( 'OAuthToken', response.access_token );
            this.router.navigate(['/profile']);
          }
        },
        err => {
          console.log(err);
          console.log("Authentication Failed")
          this.auth = true
        }
      )
  }

}
