import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { environment } from 'src/environments/environment.prod';
import { Operator, Observable, of } from 'rxjs';
import { IUsersResponse } from 'src/app/shared/models/users-response';

describe('GithubService', () => {
  let service: GithubService;
  let httpTestingController: HttpTestingController;

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
        following_url: 'https://api.github.com/users/q/following{/other_user}',
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });
    service = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('emitEvent', () => {
    const eventName = 'myEvent';
    const page = 1;

    // Espionar o método emitEventLoading
    spyOn(service, 'emitEventLoading');

    // Espionar o método getUsers e retornar a resposta simulada
    spyOn(service, 'getUsers').and.returnValue(of(mockResponseUsers));

    // Chamar o método emitEvent
    service.emitEvent(eventName, page);

    // Verificar se o método emitEventLoading foi chamado com o valor true
    expect(service.emitEventLoading).toHaveBeenCalledWith(true);

    // Verificar se o método getUsers foi chamado com os parâmetros corretos
    expect(service.getUsers).toHaveBeenCalledWith(eventName, page);

    // Verificar se o evento foi emitido corretamente
    service.getEvent().subscribe(
      (result) => {
        expect(result).toEqual(mockResponseUsers);
        expect(service.emitEventLoading).toHaveBeenCalledWith(false);
        expect(service.emitEventError).toHaveBeenCalledWith(false);
      },
      (error) => {
        expect(service.emitEventError).toHaveBeenCalledWith(true);
        expect(service.emitEventLoading).toHaveBeenCalledWith(false);
      }
    );
  });

  it('emitEventLoading', () => {
    const loading = false;

    // Espionar o método next do  eventLoading
    spyOn(service.eventLoading, 'next');

    // Chamar o método emitEventLoading
    service.emitEventLoading(loading);

    // Verificar se o método next do  eventLoading foi chamado com o valor correto
    expect(service.eventLoading.next).toHaveBeenCalledWith(loading);
  });

  it('emitEventError', () => {
    const error = false;

    // Espionar o método next do  eventError
    spyOn(service.eventError, 'next');

    // Chamar o método emitEventError
    service.emitEventError(error);

    // Verificar se o método next do eventError foi chamado com o valor correto
    expect(service.eventError.next).toHaveBeenCalledWith(error);
  });

  it('getEvent', () => {
    // Chamar o método getEvent
    const result = service.getEvent();

    // Verificar se o resultado é um Observable
    expect(result).toBeDefined();
    expect(result.subscribe).toBeDefined();

    // Verificar o tipo do resultado
    result.subscribe((response: IUsersResponse) => {
      expect(response).toBeDefined();
    });
  });

  it('getEventLoading', () => {
    // Chamar o método getEventLoading
    const result = service.getEventLoading();

    // Verificar se o resultado é um Observable
    expect(result).toBeDefined();
    expect(result.subscribe).toBeDefined();

    // Verificar o tipo do resultado
    result.subscribe((response: boolean) => {
      expect(response).toBeDefined();
    });
  });

  it('getEventError', () => {
    const result = service.getEventError();

    // Verificar se o resultado é um Observable
    expect(result).toBeDefined();
    expect(result.subscribe).toBeDefined();

    // Verificar o tipo do resultado
    result.subscribe((response: boolean) => {
      expect(response).toBeDefined();
    });
  });

  it('getUsers', () => {
    service.getUsers('username').subscribe((response) => {
      expect(response).toEqual(mockResponseUsers);
    });

    const req = httpTestingController.expectOne(
      `${environment.api_url}search/users?q=username&page=1&per_page=20`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponseUsers);
  });

  it('getUserById', () => {
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
    const username = 'johndoe';

    service.getUserById(username).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${environment.api_url}users/${username}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
