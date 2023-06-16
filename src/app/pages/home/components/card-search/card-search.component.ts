import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/core/github-service/github.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent implements OnInit {
  searchCamp!: string

  constructor(public githubService: GithubService) { }
  
  
  ngOnInit(): void {
    this.emitEvent();
  }

  emitEvent(): void {
    this.githubService.emitEvent(this.searchCamp);
  }
}
