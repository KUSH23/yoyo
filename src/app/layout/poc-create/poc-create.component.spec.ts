import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocCreateComponent } from './poc-create.component';

describe('PocCreateComponent', () => {
  let component: PocCreateComponent;
  let fixture: ComponentFixture<PocCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
