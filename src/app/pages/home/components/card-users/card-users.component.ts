import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/core/github-service/github.service';
import { ModalService } from 'src/app/core/modal-service/modal.service';
import { IUsersResponse, Item } from 'src/app/shared/models/users-response';

@Component({
  selector: 'app-card-users',
  templateUrl: './card-users.component.html',
  styleUrls: ['./card-users.component.scss']
})
export class CardUsersComponent implements OnInit {
  public listUsers!: Item[];
  public lastApiCall!: string;

  constructor(private modalService: ModalService, private githubService: GithubService) {}
  
  ngOnInit(): void {
    this.observableApi();
  
   
}


 observableApi() {
  this.githubService.getEvent().subscribe((eventName: IUsersResponse) => {
    this.listUsers  = eventName.items;
  });

}

clickOpenDetail(user: string) {
  this.modalService.openModalProfile(user)
}
}
