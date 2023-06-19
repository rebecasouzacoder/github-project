import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-error',
  templateUrl: './card-error.component.html',
  styleUrls: ['./card-error.component.scss']
})
export class CardErrorComponent {
  @Input() message!: string;
}
