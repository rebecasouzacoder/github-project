import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { CardSearchComponent } from './home/components/card-search/card-search.component';
import { CardUsersComponent } from './home/components/card-users/card-users.component';
import { PaginatorComponent } from './home/components/paginator/paginator.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserProfileComponent,
    CardSearchComponent,
    CardUsersComponent,
    PaginatorComponent,
  ],
  imports: [
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
