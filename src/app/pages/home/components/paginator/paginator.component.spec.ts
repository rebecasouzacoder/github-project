import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { GithubService } from 'src/app/core/github-service/github.service';
import { of } from 'rxjs';
import { IUsersResponse } from 'src/app/shared/models/users-response';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let githubService: GithubService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule],
      declarations: [PaginatorComponent],
      providers: [GithubService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
    fixture.detectChanges();
  });

  it('observableApi', () => {
    spyOn(githubService, 'getEvent').and.returnValue(of(mockResponseUsers));

    // Chamar o método ngOnInit()
    component.ngOnInit();

    // Verificar se a propriedade totalCount foi atualizada corretamente
    expect(component.totalCount).toBe(8854); // Verifique se o valor corresponde ao total_count mockado
  });

  it('emitEvent', () => {
    spyOn(githubService, 'emitEvent');

    // Chamar o método emitEvent com um valor de página
    component.emitEvent(2);

    // Verificar se o método emitEvent do GithubService foi chamado com os parâmetros corretos
    expect(githubService.emitEvent).toHaveBeenCalledWith('q', 2);
  });
});
