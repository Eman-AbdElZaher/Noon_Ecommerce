import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryproductComponent } from './subcategoryproduct.component';

describe('SubcategoryproductComponent', () => {
  let component: SubcategoryproductComponent;
  let fixture: ComponentFixture<SubcategoryproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
