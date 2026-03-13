import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirm-modal.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ConfirmModalComponent', () => {

  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      
      declarations: [ConfirmModalComponent],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirm event', () => {

    spyOn(component.confirm, 'emit');

    component.confirm.emit();

    expect(component.confirm.emit).toHaveBeenCalled();

  });

  it('should emit cancel event', () => {

    spyOn(component.cancel, 'emit');

    component.cancel.emit();

    expect(component.cancel.emit).toHaveBeenCalled();

  });

});