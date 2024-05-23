import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCurdComponent } from './category-curd.component';

describe('CategoryCurdComponent', () => {
  let component: CategoryCurdComponent;
  let fixture: ComponentFixture<CategoryCurdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCurdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryCurdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
