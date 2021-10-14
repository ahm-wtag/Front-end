import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardParentComponent } from './post-card-parent.component';

describe('PostParentComponent', () => {
  let component: PostCardParentComponent;
  let fixture: ComponentFixture<PostCardParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCardParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
