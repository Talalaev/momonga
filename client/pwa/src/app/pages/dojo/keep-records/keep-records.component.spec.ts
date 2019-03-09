import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepRecordsComponent } from './keep-records.component';

describe('KeepRecordsComponent', () => {
  let component: KeepRecordsComponent;
  let fixture: ComponentFixture<KeepRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
