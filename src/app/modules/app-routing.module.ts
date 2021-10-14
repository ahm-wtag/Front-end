import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../components/error/error.component';
import { LoginComponent } from '../components/login/login.component';
import { PostCardParentComponent } from '../components/post-card-parent/post-card-parent.component';
import { PostComponent } from '../components/post/post.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { RegisterComponent } from '../components/register/register.component';
import { AuthGuard } from '../guards/auth.guard';
import { PostFormParentComponent } from '../components/post-form-parent/post-form-parent.component';
import { ResourceGuard } from '../guards/resource.guard';
import { HomeComponent } from '../components/home/home.component';
import { SettingsComponent } from '../components/settings/settings.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'error-page', component: ErrorComponent},
  {path: ':handle', component: ProfileComponent},
  {path: ':handle/settings', component: SettingsComponent, canActivate:[AuthGuard,ResourceGuard]},
  {path: 'posts/create', component: PostFormParentComponent, canActivate: [AuthGuard]},
  {path: 'posts/:postId', component: PostComponent},
  {path: 'posts/edit/:postId', component: PostFormParentComponent, canActivate: [AuthGuard]},
  {path: '**',component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
