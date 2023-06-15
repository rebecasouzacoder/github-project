import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoadingComponent } from './components/loading/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule, 
    MatProgressSpinnerModule,
    CommonModule,
  ], 
  exports: [
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    LoadingComponent,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
