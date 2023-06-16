import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { GithubService } from 'src/app/core/github-service/github.service';
import { of } from 'rxjs';
import { IUserByIdResponse } from 'src/app/shared/models/userById-response';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let githubService: GithubService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [UserProfileComponent],
      providers: [  GithubService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} } ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
    fixture.detectChanges();
  });

  it('getUser', () => {
    const mockResponse = {
      "login": "turbio",
      "id": 1428207,
      "node_id": "MDQ6VXNlcjE0MjgyMDc=",
      "avatar_url": "https://avatars.githubusercontent.com/u/1428207?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/turbio",
      "html_url": "https://github.com/turbio",
      "followers_url": "https://api.github.com/users/turbio/followers",
      "following_url": "https://api.github.com/users/turbio/following{/other_user}",
      "gists_url": "https://api.github.com/users/turbio/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/turbio/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/turbio/subscriptions",
      "organizations_url": "https://api.github.com/users/turbio/orgs",
      "repos_url": "https://api.github.com/users/turbio/repos",
      "events_url": "https://api.github.com/users/turbio/events{/privacy}",
      "received_events_url": "https://api.github.com/users/turbio/received_events",
      "type": "User",
      "site_admin": false,
      "name": "mason",
      "company": null,
      "blog": "turb.io",
      "location": "???",
      "email": null,
      "hireable": null,
      "bio": ":q!",
      "twitter_username": null,
      "public_repos": 59,
      "public_gists": 1,
      "followers": 173,
      "following": 5,
      "created_at": "2012-02-11T04:02:48Z",
      "updated_at": "2023-05-30T01:25:46Z"
  };

    spyOn(githubService, 'getUserById').and.returnValue(of(mockResponse));

    // Definir o valor desejado para o parâmetro data
    component.data = 'user1';

    // Chamar o método ngOnInit()
    component.ngOnInit();

    // Verificar se a propriedade user foi atualizada corretamente
    expect(component.user).toEqual(mockResponse);
  });

  it('openGitHubProfile', () => {
    spyOn(window, 'open');

    const link = 'https://github.com/user1';

    // Chamar o método openGitHubProfile com um link
    component.openGitHubProfile(link);

    // Verificar se a função window.open foi chamada com o link correto
    expect(window.open).toHaveBeenCalledWith(link, '_blank');
  });
});