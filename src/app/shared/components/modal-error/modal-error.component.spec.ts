import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalErrorComponent } from './modal-error.component';
import { SharedModule } from '../../shared.module';

describe('ModalErrorComponent', () => {
  let component: ModalErrorComponent;
  let fixture: ComponentFixture<ModalErrorComponent>;
  let dialogRefMock: MatDialogRef<ModalErrorComponent>;

  beforeEach(async () => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ModalErrorComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on action', () => {
    
    // Chame o método sendo testado
    component.dialogRef.close(); 

    // Verifique se o comportamento esperado ocorreu
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

});