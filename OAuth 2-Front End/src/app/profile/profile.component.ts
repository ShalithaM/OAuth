import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  profile = { csrf: '', firstName: '', lastName: '', address: '', email: '', };
  access_token = '';
  response = false;

  ngOnInit() {
    this.checkToken()
  }

  submit() {
    // this.http.post('http://localhost:3000/profile', {
    //   firstName: this.profile.firstName,
    //   lastName: this.profile.lastName,
    //   address: this.profile.address,
    //   email: this.profile.email,
    //   token: this.profile.csrf
    // }, { headers: new HttpHeaders().set('SID', this.cookieValue) }).subscribe(
    //   res => {
    //     let data;
    //     data = res
    //     this.response = data.result;
    //     console.log(res);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // )
  }

  checkToken(){
    this.access_token = this.cookieService.get('OAuthToken');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.access_token)

    this.http.get('http://localhost:3000/', { headers: headers }).subscribe(
      res => {
        console.log(res);
        this.response = true;
      },
      err => {
        this.cookieService.delete('OAuthToken')
        this.router.navigate(['/login']);
        console.log(err);
      }
    )
  }

}
