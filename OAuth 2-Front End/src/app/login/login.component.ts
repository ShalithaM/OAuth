import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fileToUpload: File = null;
  filestring

  public auth2: any = {};
  // **Google Sign In method**
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '182411610010-q20b58dric7t8g5rjci6g7usdaipltku.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email openid https://www.googleapis.com/auth/drive.file '
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log(profile)
        console.log(googleUser.getAuthResponse())
        console.log(googleUser.getAuthResponse().access_token)

        this.cookieService.set('TokenID', googleUser.getAuthResponse().access_token);
        this.cookieService.set('name', profile.getName());
        this.cookieService.set('email', profile.getEmail());
        // this.router.navigate(['/upload']);

      }, (error) => {
        console.log(error);
      });
  }

  constructor(private router: Router, private cookieService: CookieService) { }

  ngAfterViewInit() {
    this.googleInit();
  }

  ngOnInit() {

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.fileToUpload);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.filestring = btoa(binaryString);  // Converting binary string data.
  }

  upload() {
    // console.log(this.fileToUpload)
    // // gapi.load('client', insert(this.fileToUpload, this.filestring));

    // var request = gapi.client
    // console.log(request)

    var fileContent = 'sample text'; // As a sample, upload a text file.
    var file = new Blob([fileContent], { type: 'text/plain' });
    var metadata = {
      'name': 'sampleName', // Filename at Google Drive
      'mimeType': 'text/plain', // mimeType at Google Drive
      'parents': ['1GtIt5SCFMzRdjVbh9aM3GxKX8dX46rnd'], // Folder ID at Google Drive
    };

    var accessToken = this.cookieService.get('TokenID')
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = 'json';
    xhr.onload = () => {
      console.log(xhr.response.id); // Retrieve uploaded file ID.
    };
    xhr.send(form);
  }
  login() {
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', 'Basic ' + 'YXBwbGljYXRpb246c2VjcmV0')
    // headers = headers.set('Content-Type', 'application/x-www-form-urlencoded')

    // let body = new URLSearchParams();
    // body.set('grant_type', 'password');
    // body.set('username', this.userdetails.username);
    // body.set('password', this.userdetails.password);

    // this.http.post('http://localhost:3000/login',
    //   body.toString(),
    //   {
    //     headers: headers
    //   }).subscribe(
    //     res => {
    //       let response;
    //       response = res;
    //       console.log(res);

    //       if (response.code == 400) {
    //         console.log("Authentication Failed")
    //         this.auth = true
    //       }
    //       else {
    //         this.auth = false
    //         this.cookieService.set( 'OAuthToken', response.access_token );
    //         this.router.navigate(['/upload']);
    //       }
    //     },
    //     err => {
    //       console.log(err);
    //       console.log("Authentication Failed")
    //       this.auth = true
    //     }
    //   )
  }

}

function insert(file, filestring) {
  console.log("test 1")
  console.log(file)
  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  var reader = new FileReader();
  // reader.onload = this._handleReaderLoaded.bind(this);
  var contentType = file || 'application/octet-stream';
  var metadata = {
    'title': file,
    'mimeType': contentType
  };

  var base64Data = filestring
  console.log(base64Data)

  var multipartRequestBody =
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: ' + contentType + '\r\n' +
    'Content-Transfer-Encoding: base64\r\n' +
    '\r\n' +
    base64Data +
    close_delim;

  gapi.client.request({
    'path': '/upload/drive/v2/files',
    'method': 'POST',
    'params': { 'uploadType': 'multipart' },
    'headers': {
      'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
    },
    'body': multipartRequestBody
  });
}
