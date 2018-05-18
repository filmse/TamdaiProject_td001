import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointznetComponent } from './pointznet.component';

describe('PointznetComponent', () => {
  let component: PointznetComponent;
  let fixture: ComponentFixture<PointznetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointznetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointznetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
