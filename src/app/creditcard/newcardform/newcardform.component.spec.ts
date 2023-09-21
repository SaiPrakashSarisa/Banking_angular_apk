import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcardformComponent } from './newcardform.component';

describe('NewcardformComponent', () => {
  let component: NewcardformComponent;
  let fixture: ComponentFixture<NewcardformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewcardformComponent]
    });
    fixture = TestBed.createComponent(NewcardformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
