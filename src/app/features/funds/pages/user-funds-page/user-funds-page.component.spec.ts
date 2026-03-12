import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFundsPageComponent } from './user-funds-page.component';

describe('UserFundsPageComponent', () => {
  let component: UserFundsPageComponent;
  let fixture: ComponentFixture<UserFundsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFundsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFundsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
