import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootOfPagesComponent } from './root-of-pages.component';

describe('RootOfPagesComponent', () => {
  let component: RootOfPagesComponent;
  let fixture: ComponentFixture<RootOfPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootOfPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootOfPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
