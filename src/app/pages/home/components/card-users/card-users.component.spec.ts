import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardUsersComponent } from './card-users.component';
import { GithubService } from 'src/app/core/github-service/github.service';
import { ModalService } from 'src/app/core/modal-service/modal.service';
import { of, throwError } from 'rxjs';
import { IUsersResponse, Item } from 'src/app/shared/models/users-response';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { IUserByIdResponse } from 'src/app/shared/models/userById-response';

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

  it('should observableApi', () => {
    // Defina os valores de teste
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
   
    // Espione os métodos e simule o comportamento esperado
    spyOn(githubService, 'getEvent').and.returnValue(of(mockResponseUsers));

    // Chamar o método ngOnInit()
    component.ngOnInit();

    // Verificar se a propriedade listUsers foi atualizada corretamente
    expect(component.listUsers).toEqual(mockResponseUsers.items);
  });
  
  it('should clickOpenDetail successful user fetch', () => {
    // Defina os valores de teste
    const user = 'some-user';
    const mockResponse = {
      login: 'turbio',
      id: 1428207,
      node_id: 'MDQ6VXNlcjE0MjgyMDc=',
      avatar_url: 'https://avatars.githubusercontent.com/u/1428207?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/turbio',
      html_url: 'https://github.com/turbio',
      followers_url: 'https://api.github.com/users/turbio/followers',
      following_url:
        'https://api.github.com/users/turbio/following{/other_user}',
      gists_url: 'https://api.github.com/users/turbio/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/turbio/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/turbio/subscriptions',
      organizations_url: 'https://api.github.com/users/turbio/orgs',
      repos_url: 'https://api.github.com/users/turbio/repos',
      events_url: 'https://api.github.com/users/turbio/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/turbio/received_events',
      type: 'User',
      site_admin: false,
      name: 'mason',
      company: null,
      blog: 'turb.io',
      location: '???',
      email: null,
      hireable: null,
      bio: ':q!',
      twitter_username: null,
      public_repos: 59,
      public_gists: 1,
      followers: 173,
      following: 5,
      created_at: '2012-02-11T04:02:48Z',
      updated_at: '2023-05-30T01:25:46Z',
    };
 
    // Espione os métodos e simule o comportamento esperado
    spyOn(githubService, 'emitEventLoading');
    spyOn(githubService, 'getUserById').and.returnValue(of(mockResponse)); // Use RxJS 'of' to create an observable with a mocked response

    spyOn(modalService, 'openModalProfile');
    spyOn(modalService, 'openModalError');
  
    // Chame o método sendo testado
    component.clickOpenDetail(user);

    // Verifica se a propriedade listUsers foi atualizada corretamente
    expect(githubService.emitEventLoading).toHaveBeenCalledWith(true);
    expect(githubService.getUserById).toHaveBeenCalledWith(user);
    expect(modalService.openModalProfile).toHaveBeenCalledWith(mockResponse);
    expect(githubService.emitEventLoading).toHaveBeenCalledWith(false);
    expect(modalService.openModalError).not.toHaveBeenCalled();
  });

  it('should clickOpenDetail error user fetch', () => {
      // Defina os valores de teste
    const user = 'some-user';

      // Espione os métodos e simule o comportamento esperado
    spyOn(githubService, 'emitEventLoading');
    spyOn(githubService, 'getUserById').and.returnValue(throwError(new Error('Some error message'))); // Use RxJS 'throwError' to create an observable with an error

    spyOn(modalService, 'openModalProfile');
    spyOn(modalService, 'openModalError');

     // Chame o método sendo testado
    component.clickOpenDetail(user);

    // Verifica se a propriedade listUsers foi atualizada corretamente
    expect(githubService.emitEventLoading).toHaveBeenCalledWith(true);
    expect(githubService.getUserById).toHaveBeenCalledWith(user);
    expect(modalService.openModalProfile).not.toHaveBeenCalled();
    expect(githubService.emitEventLoading).toHaveBeenCalledWith(false);
    expect(modalService.openModalError).toHaveBeenCalled();
  });

});
