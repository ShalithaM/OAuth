import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import {Routes, RouterModule, Router} from '@angular/router';
import {UploadComponent} from './upload/upload.component';

const routes: Routes = [
    { path: 'upload', component: UploadComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
  ],
})
export class AppRoutingModule {
    constructor(private router: Router) {
        this.router.errorHandler = (error: any) => {
            this.router.navigate(['upload']);
        }
    }
}
