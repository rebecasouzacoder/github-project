import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/core/github-service/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
public error!: boolean;

  constructor(private githubService: GithubService) {}

  
  ngOnInit(): void {
    this.observableApi()
  }

  observableApi() {
    this.githubService.getEventError().subscribe((event: boolean) => {   
      this.error = event;
    });
}

}
