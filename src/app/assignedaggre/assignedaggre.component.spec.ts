import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedaggreComponent } from './assignedaggre.component';

describe('AssignedaggreComponent', () => {
  let component: AssignedaggreComponent;
  let fixture: ComponentFixture<AssignedaggreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedaggreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedaggreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
