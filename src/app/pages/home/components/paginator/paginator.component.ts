import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/core/github-service/github.service';
import { IUsersResponse } from 'src/app/shared/models/users-response';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  page: number = 1
  totalCount!: number;

  constructor(private githubService: GithubService) {}
  
  ngOnInit(): void {
    this.observableApi()
  }

  emitEvent(page: any): void {
    this.page = page;
    this.githubService.emitEvent('a', page);
  }

  observableApi() {
    this.githubService.getEvent().subscribe((eventName: IUsersResponse) => {
      this.totalCount  = eventName.total_count;
    });

}

}
