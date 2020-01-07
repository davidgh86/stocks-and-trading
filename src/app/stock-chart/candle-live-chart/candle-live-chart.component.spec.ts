import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleLiveChartComponent } from './candle-live-chart.component';

describe('CandleLiveChartComponent', () => {
  let component: CandleLiveChartComponent;
  let fixture: ComponentFixture<CandleLiveChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandleLiveChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandleLiveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
