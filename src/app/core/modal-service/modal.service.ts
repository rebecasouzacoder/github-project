import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { IUserByIdResponse } from 'src/app/shared/models/userById-response';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  openModalProfile(params: IUserByIdResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '340px'
    dialogConfig.maxWidth = '600px'
    dialogConfig.data =  params
  return this.dialog.open(UserProfileComponent, dialogConfig)

}

openModalError() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.minWidth = '340px'
  dialogConfig.maxWidth = '600px'
return this.dialog.open(ModalErrorComponent, dialogConfig)

}


}
