import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post!: Post;
  @Input() enableActions: boolean = false;


  @Output() onDelete: EventEmitter<Post> =  new EventEmitter();

  deleted: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onEditAction() {
    this.router.navigate(['/posts/edit',this.post.id]);
  }

  onDeleteAction() {

    let del = confirm('Are you sure you want to delete?');

    if ( !del ) return;

    this.deleted = true;

    this.onDelete.emit(this.post);
    
  }

  onReadMore() {
    this.router.navigate(['/posts',this.post.id]);
  }

}
