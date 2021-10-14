import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';
import { FormType } from '../shared/form-type.enum';


@Component({
  selector: 'app-post-form-parent',
  templateUrl: './post-form-parent.component.html',
  styleUrls: ['./post-form-parent.component.css']
})
export class PostFormParentComponent implements OnInit {


  $postSub = new BehaviorSubject<Post|null>(null);
  post!: Post;
  formType!: FormType;
  loggedInUser!: User;
  

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService ) { }

  ngOnInit(): void {

    this.loggedInUser = JSON.parse(localStorage.getItem('user') as string);

    if (this.route.snapshot.url[1].path == 'edit') {
      
      this.formType = FormType.UPDATE_FORM;

      const postId = this.route.snapshot.params.postId;

      this.postService.getPostById(postId).subscribe(
        postToUpdate => {
          if ( postToUpdate.customerId !== this.loggedInUser.id ) {
            this.router.navigate(['/error-page']);
          }
          this.post = postToUpdate;
          this.$postSub.next(postToUpdate);

        },
        error => {
          this.router.navigate(['/error-page']);
        }
      );

    }

    else {
      this.formType = FormType.CREATE_FORM;
    }

  }


  onCreate($post: Post) {

    this.postService.createPost($post,this.loggedInUser.id as number).subscribe(
      success => {
        this.router.navigate([this.loggedInUser.handle]);
      },
      err => {
        this.router.navigate(['/error-page']);
      }
    );
  }

  onUpdate($newPost: Post) {

    this.postService.updatePost($newPost,this.post).subscribe(
      success => {
        this.router.navigate([this.loggedInUser.handle]);
      },
      err => {
        this.router.navigate(['/error-page']);
      }
    );

  }

  generateUpdateForm() {
    return (this.post?.id as number && this.route.snapshot.url[1].path === 'edit');
  }

}
