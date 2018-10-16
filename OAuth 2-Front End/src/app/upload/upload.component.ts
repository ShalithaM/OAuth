import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileToUpload: File = null;
  filestring

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  access_token = '';
  response = false;

  ngOnInit() {
    // this.checkToken()
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

  // upload() {
  //   console.log(this.fileToUpload)

  //     console.log("test 1")
  //     console.log(this.fileToUpload)
  //     const boundary = '-------314159265358979323846';
  //     const delimiter = "\r\n--" + boundary + "\r\n";
  //     const close_delim = "\r\n--" + boundary + "--";

  //     var reader = new FileReader();
  //     // reader.onload = this._handleReaderLoaded.bind(this);
  //     var contentType = this.fileToUpload.type || 'application/octet-stream';
  //     var metadata = {
  //       'title': this.fileToUpload.name,
  //       'mimeType': contentType
  //     };

  //     var base64Data = this.filestring
  //     console.log(base64Data)

  //     var multipartRequestBody =
  //       delimiter +
  //       'Content-Type: application/json\r\n\r\n' +
  //       JSON.stringify(metadata) +
  //       delimiter +
  //       'Content-Type: ' + contentType + '\r\n' +
  //       'Content-Transfer-Encoding: base64\r\n' +
  //       '\r\n' +
  //       base64Data +
  //       close_delim;

  //    gapi.client.request({
  //       'path': '/upload/drive/v2/files',
  //       'method': 'POST',
  //       'params': { 'uploadType': 'multipart' },
  //       'headers': {
  //         'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
  //       },
  //       'body': multipartRequestBody
  //     });
  // }

  checkToken() {
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

