import { Component, OnInit } from '@angular/core';
import { PostCardParentType } from '../shared/post-card-parent-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  _postCardParentType = PostCardParentType.ALL_POSTS;

  constructor() { }

  ngOnInit(): void {
  }

}
