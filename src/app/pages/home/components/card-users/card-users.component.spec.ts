import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardUsersComponent } from './card-users.component';
import { GithubService } from 'src/app/core/github-service/github.service';
import { ModalService } from 'src/app/core/modal-service/modal.service';
import { of } from 'rxjs';
import { IUsersResponse, Item } from 'src/app/shared/models/users-response';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

describe('CardUsersComponent', () => {
  let component: CardUsersComponent;
  let fixture: ComponentFixture<CardUsersComponent>;
  let githubService: GithubService;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule],
      declarations: [CardUsersComponent],
      providers: [
        GithubService,
        ModalService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUsersComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('observableApi', () => {
    var mockResponseUsers = {
      total_count: 8854,
      incomplete_results: false,
      items: [
        {
          login: 'q',
          id: 65956,
          node_id: 'MDQ6VXNlcjY1OTU2',
          avatar_url: 'https://avatars.githubusercontent.com/u/65956?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/q',
          html_url: 'https://github.com/q',
          followers_url: 'https://api.github.com/users/q/followers',
          following_url:
            'https://api.github.com/users/q/following{/other_user}',
          gists_url: 'https://api.github.com/users/q/gists{/gist_id}',
          starred_url: 'https://api.github.com/users/q/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/q/subscriptions',
          organizations_url: 'https://api.github.com/users/q/orgs',
          repos_url: 'https://api.github.com/users/q/repos',
          events_url: 'https://api.github.com/users/q/events{/privacy}',
          received_events_url: 'https://api.github.com/users/q/received_events',
          type: 'User',
          site_admin: false,
          score: 1.0,
        },
      ],
    };

    spyOn(githubService, 'getEvent').and.returnValue(of(mockResponseUsers));

    // Chamar o método ngOnInit()
    component.ngOnInit();

    // Verificar se a propriedade listUsers foi atualizada corretamente
    expect(component.listUsers).toEqual(mockResponseUsers.items);
  });

  it('clickOpenDetail', () => {
    spyOn(modalService, 'openModalProfile');

    const user = 'user1';

    // Chamar o método clickOpenDetail com um nome de usuário
    component.clickOpenDetail(user);

    // Verificar se o método openModalProfile do ModalService foi chamado com o usuário correto
    expect(modalService.openModalProfile).toHaveBeenCalledWith(user);
  });
});
