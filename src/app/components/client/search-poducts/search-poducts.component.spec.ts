import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPoductsComponent } from './search-poducts.component';

describe('SearchPoductsComponent', () => {
  let component: SearchPoductsComponent;
  let fixture: ComponentFixture<SearchPoductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPoductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPoductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
