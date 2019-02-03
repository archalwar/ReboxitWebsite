import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaggrereqrecComponent } from './adminaggrereqrec.component';

describe('AdminaggrereqrecComponent', () => {
  let component: AdminaggrereqrecComponent;
  let fixture: ComponentFixture<AdminaggrereqrecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminaggrereqrecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaggrereqrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
