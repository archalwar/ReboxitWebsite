import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScraperequestadminComponent } from './scraperequestadmin.component';

describe('ScraperequestadminComponent', () => {
  let component: ScraperequestadminComponent;
  let fixture: ComponentFixture<ScraperequestadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScraperequestadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScraperequestadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
