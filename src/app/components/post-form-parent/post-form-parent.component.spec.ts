import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormParentComponent } from './post-form-parent.component';

describe('PostFormParentComponent', () => {
  let component: PostFormParentComponent;
  let fixture: ComponentFixture<PostFormParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFormParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
