import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlatPendakianComponent } from './alat-pendakian.component';

describe('AlatPendakianComponent', () => {
  let component: AlatPendakianComponent;
  let fixture: ComponentFixture<AlatPendakianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlatPendakianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlatPendakianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
