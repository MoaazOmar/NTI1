import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmangComponent } from './productmang.component';

describe('ProductmangComponent', () => {
  let component: ProductmangComponent;
  let fixture: ComponentFixture<ProductmangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductmangComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductmangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
