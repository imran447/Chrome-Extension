import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSportAdsComponent } from './banner-sport-ads.component';

describe('BannerSportAdsComponent', () => {
  let component: BannerSportAdsComponent;
  let fixture: ComponentFixture<BannerSportAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerSportAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSportAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
