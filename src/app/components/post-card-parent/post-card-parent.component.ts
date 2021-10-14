import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { finalize, takeUntil, takeWhile } from 'rxjs/operators'
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { PostCardParentType } from '../shared/post-card-parent-type.enum';

@Component({
  selector: 'app-post-card-parent',
  templateUrl: './post-card-parent.component.html',
  styleUrls: ['./post-card-parent.component.css']
})
export class PostCardParentComponent implements OnInit {



  @Input()
  user !: User;
  @Input()
  parentType!: PostCardParentType;
  
  _enableActions: boolean = false;

  _posts!: Post[];
  
  

  constructor(
    private postService: PostService, 
    private userService: UserService,
    private router: Router) {}



  
  ngOnInit(): void {
    
    switch(this.parentType){

      case PostCardParentType.ALL_POSTS:{
        this.getAllPosts();
        break;
      }

      case PostCardParentType.USER_POSTS:{
        this.getUserPosts();
        break;
      }
      
    }

  }




  getAllPosts() {
    this.postService.getPosts().subscribe(
      posts => {
        this._posts = posts;
      }
    );
  }

  getUserPosts() {
    
    if ( this.user?.id === AuthService.getCurrentUser()?.id) {
      this._enableActions = true;
    }

    this.userService.getUserPosts(this.user?.id).subscribe(
      posts => {
        this._posts = posts;
      },
      err => {
        this.router.navigate(['/error-page']);
      }
    );

  }



  onDelete(post: Post) {

    this.postService.deletePost(post,this.user?.id as number).subscribe(
      success => {
      },
      error => {
        this.router.navigate(['/error-page']);
      }
    );
    
  }


}
