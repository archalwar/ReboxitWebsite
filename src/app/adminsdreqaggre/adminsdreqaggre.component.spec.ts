import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsdreqaggreComponent } from './adminsdreqaggre.component';

describe('AdminsdreqaggreComponent', () => {
  let component: AdminsdreqaggreComponent;
  let fixture: ComponentFixture<AdminsdreqaggreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsdreqaggreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsdreqaggreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
