import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrecComponent } from './adminrec.component';

describe('AdminrecComponent', () => {
  let component: AdminrecComponent;
  let fixture: ComponentFixture<AdminrecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminrecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
