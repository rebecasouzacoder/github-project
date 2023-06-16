import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GithubService } from 'src/app/core/github-service/github.service';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loading!: boolean;
  color: ThemePalette = 'accent';
constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.observableApi()
  }

  observableApi() {
    this.githubService.getEventLoading().subscribe((event: boolean) => {      
      this.loading = event;
    });
}

}
