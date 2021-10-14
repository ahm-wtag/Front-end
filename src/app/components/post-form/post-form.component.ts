import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { FormType } from '../shared/form-type.enum';





@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  

  @Input() $post!:BehaviorSubject<Post|null>;
  @Input() formType!: FormType;
  @Output() createEvent: EventEmitter<Post> = new EventEmitter();
  @Output() updateEvent: EventEmitter<Post> = new EventEmitter();

  postForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    body: new FormControl('')
  });
  

  constructor() { }

  ngOnInit(): void {

    this.$post?.subscribe(
      (postToUpdate) => {
        this.postForm.controls['title'].setValue(postToUpdate?.title);
        this.postForm.controls['body'].setValue(postToUpdate?.body);
      }
    );
    
  }    
    
  onSubmit() {
    
    const postDetails: Post = this.postForm.value;

    switch(this.formType) {
      
      case FormType.CREATE_FORM:
        this.createEvent.emit(postDetails);
        break;
      
      case FormType.UPDATE_FORM:
        this.updateEvent.emit(postDetails);
        break;

    }

  }




}
