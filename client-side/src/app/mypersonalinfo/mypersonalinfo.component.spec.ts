import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypersonalinfoComponent } from './mypersonalinfo.component';

describe('MypersonalinfoComponent', () => {
  let component: MypersonalinfoComponent;
  let fixture: ComponentFixture<MypersonalinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypersonalinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypersonalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
