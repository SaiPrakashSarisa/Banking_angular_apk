import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawformComponent } from './withdrawform.component';

describe('WithdrawformComponent', () => {
  let component: WithdrawformComponent;
  let fixture: ComponentFixture<WithdrawformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawformComponent]
    });
    fixture = TestBed.createComponent(WithdrawformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
