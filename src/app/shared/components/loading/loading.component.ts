import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
 
  color: ThemePalette = 'accent';
constructor(  public sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }
}
