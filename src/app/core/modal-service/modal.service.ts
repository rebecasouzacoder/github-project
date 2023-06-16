import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  openModalProfile(params: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '340px'
    dialogConfig.maxWidth = '600px'
   dialogConfig.panelClass = 'custom-modalbox'
    dialogConfig.data =  params
  return this.dialog.open(UserProfileComponent, dialogConfig)

}


}
