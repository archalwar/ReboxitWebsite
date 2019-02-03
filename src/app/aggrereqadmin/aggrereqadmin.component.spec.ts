import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrereqadminComponent } from './aggrereqadmin.component';

describe('AggrereqadminComponent', () => {
  let component: AggrereqadminComponent;
  let fixture: ComponentFixture<AggrereqadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggrereqadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggrereqadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
