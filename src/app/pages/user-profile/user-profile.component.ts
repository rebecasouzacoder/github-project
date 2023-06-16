import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GithubService } from 'src/app/core/github-service/github.service';
import { IUserByIdResponse } from 'src/app/shared/models/userById-response';
import { Item } from 'src/app/shared/models/users-response';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user!: IUserByIdResponse

  constructor(private githubService: GithubService, public dialogRef: MatDialogRef<UserProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: string,) {}
 
  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.githubService.getUserById(this.data).subscribe((result: IUserByIdResponse) => {
      this.user = result;
    })
  }

  openGitHubProfile(link: string) {
    window.open(link, '_blank')
  }

}
