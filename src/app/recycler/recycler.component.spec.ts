import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclerComponent } from './recycler.component';

describe('RecyclerComponent', () => {
  let component: RecyclerComponent;
  let fixture: ComponentFixture<RecyclerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecyclerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecyclerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
