import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositformComponent } from './depositform.component';

describe('DepositformComponent', () => {
  let component: DepositformComponent;
  let fixture: ComponentFixture<DepositformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositformComponent]
    });
    fixture = TestBed.createComponent(DepositformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
