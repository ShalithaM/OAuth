import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { UploadComponent } from './upload/upload.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
