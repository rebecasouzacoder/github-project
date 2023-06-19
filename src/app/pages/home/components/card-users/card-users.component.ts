import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/core/github-service/github.service';
import { ModalService } from 'src/app/core/modal-service/modal.service';
import { IUserByIdResponse } from 'src/app/shared/models/userById-response';
import { IUsersResponse, Item } from 'src/app/shared/models/users-response';

@Component({
  selector: 'app-card-users',
  templateUrl: './card-users.component.html',
  styleUrls: ['./card-users.component.scss'],
})
export class CardUsersComponent implements OnInit {
  public listUsers!: Item[];
  public lastApiCall!: string;

  constructor(
    private modalService: ModalService,
    private githubService: GithubService
  ) {}

  ngOnInit(): void {
    this.observableApi();
  }

  observableApi() {
    this.githubService.getEvent().subscribe((eventName: IUsersResponse) => {
      if (eventName.items.length == 0) {
        this.githubService.emitEventError({error: true, message: 'Usuário não encontrado'});
        return;
      }
      this.listUsers = eventName.items;
    });
  }

  clickOpenDetail(user: string) {
    this.githubService.emitEventLoading(true)   
    
    this.githubService.getUserById(user).subscribe((result: IUserByIdResponse) => {
      this.modalService.openModalProfile(result);
      this.githubService.emitEventLoading(false)  
    }, error => {
      this.modalService.openModalError();
      this.githubService.emitEventLoading(false)  
    });
  }
}
