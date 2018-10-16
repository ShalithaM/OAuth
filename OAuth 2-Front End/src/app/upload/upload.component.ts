import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
declare const gapi: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

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
        alert('Success \nOAuth 2 Token : ' + googleUser.getAuthResponse().access_token)

      }, (error) => {
        console.log(error);
      });
  }


  constructor(private cookieService: CookieService) {
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.googleInit();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload() {

    var fileContent = this.fileToUpload; 

    var file = new Blob([fileContent], { type: this.fileToUpload.type });
    var metadata = {
      'name': this.fileToUpload.name, // Filename at Google Drive
      'mimeType': this.fileToUpload.type, // mimeType at Google Drive
      'parents': ['1GtIt5SCFMzRdjVbh9aM3GxKX8dX46rnd'], // Folder ID at Google Drive
    };

    var accessToken = this.cookieService.get('TokenID')
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = 'json';

    xhr.onload = () => {
      alert("Success")
      console.log(xhr.response); // Retrieve uploaded file ID.
    }
    xhr.send(form);
  }

  remove() {
    console.log("Remove Token")
    this.cookieService.delete('TokenID')
    alert('Token Has Removed')
  }

}

