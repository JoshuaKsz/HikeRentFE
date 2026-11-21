import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRecordsComponent } from './return-records.component';

describe('ReturnRecordsComponent', () => {
  let component: ReturnRecordsComponent;
  let fixture: ComponentFixture<ReturnRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnRecordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
