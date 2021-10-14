import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { PostCardParentType } from '../shared/post-card-parent-type.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  _$userSubject = new BehaviorSubject<User|null>(null);
  _$user!: User;
  _postCardParentType = PostCardParentType.USER_POSTS;


  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private router: Router,
    private postService: PostService) { }

  ngOnInit(): void {
    
    const handle = this.route.snapshot.params.handle;
    
    this.userService.getUser(handle).subscribe(
      user => {
        this._$user = user;
      },
      error => {
        this.router.navigate(['error-page']);
      }
    )

  }



}
