import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclereqadminComponent } from './recyclereqadmin.component';

describe('RecyclereqadminComponent', () => {
  let component: RecyclereqadminComponent;
  let fixture: ComponentFixture<RecyclereqadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecyclereqadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecyclereqadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
