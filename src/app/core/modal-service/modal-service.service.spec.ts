import { TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalService } from './modal.service';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { of } from 'rxjs';

describe('ModalService', () => {
  let service: ModalService;
  let matDialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalService,
        { provide: MatDialog, useValue: { open: () => {} } },
      ],
    });
    service = TestBed.inject(ModalService);
    matDialog = TestBed.inject(MatDialog);
  });

  it('openModalProfile', () => {
    const params = 'params';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '340px';
    dialogConfig.maxWidth = '600px';
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.data = params;

    // Espionar o método open do MatDialog
    spyOn(matDialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<UserProfileComponent>);

    // Chamar o método openModalDynamic
    service.openModalProfile(params);

    // Verificar se o método open do MatDialog foi chamado com os parâmetros corretos
    expect(matDialog.open).toHaveBeenCalledWith(
      UserProfileComponent,
      dialogConfig
    );
  });
});
