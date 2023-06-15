import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CardSearchComponent } from './components/card-search/card-search.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CardUsersComponent } from './components/card-users/card-users.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { LoadingComponent } from './components/loading/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    CardSearchComponent,
    CardUsersComponent,
    PaginatorComponent,
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
    CardSearchComponent,
    CardUsersComponent,
    PaginatorComponent,
    CommonModule,
    LoadingComponent,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
