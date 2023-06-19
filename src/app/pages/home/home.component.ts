import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/core/github-service/github.service';
import { IError } from 'src/app/shared/models/error';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public error!: IError;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.observableApi();
  }

  observableApi() {
    this.githubService.getEventError().subscribe((event: IError) => {
      this.error = event;
      this.githubService.emitEventLoading(false);
    });
  }
}
