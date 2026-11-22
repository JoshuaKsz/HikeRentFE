import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriMerekComponent } from './kategori-merek.component';

describe('KategoriMerekComponent', () => {
  let component: KategoriMerekComponent;
  let fixture: ComponentFixture<KategoriMerekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KategoriMerekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KategoriMerekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
