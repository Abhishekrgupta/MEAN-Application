import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalinfolistComponent } from './personalinfolist.component';

describe('PersonalinfolistComponent', () => {
  let component: PersonalinfolistComponent;
  let fixture: ComponentFixture<PersonalinfolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalinfolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalinfolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
