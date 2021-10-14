import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './modules/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostCardParentComponent } from './components/post-card-parent/post-card-parent.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { LoginComponent } from './components/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './components/register/register.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { ErrorComponent } from './components/error/error.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PostFormParentComponent } from './components/post-form-parent/post-form-parent.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostCardParentComponent,
    PostCardComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    ProfileComponent,
    UserFormComponent,
    PostFormComponent,
    ErrorComponent,
    PostFormParentComponent,
    HomeComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
