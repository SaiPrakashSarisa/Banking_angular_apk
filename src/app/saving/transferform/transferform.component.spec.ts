import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferformComponent } from './transferform.component';

describe('TransferformComponent', () => {
  let component: TransferformComponent;
  let fixture: ComponentFixture<TransferformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferformComponent]
    });
    fixture = TestBed.createComponent(TransferformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
