import { TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalService } from './modal.service';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { of } from 'rxjs';
import { IUserByIdResponse } from 'src/app/shared/models/userById-response';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';

describe('ModalService', () => {
  let dialog: MatDialog;
  let dialogRefMock: MatDialogRef<UserProfileComponent>;
  let component: ModalService;

  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      providers: [
        ModalService,
        { provide: MatDialog, useValue: { open: () => {} } },
      ],
    });
    dialog = TestBed.inject(MatDialog);
    component = TestBed.inject(ModalService);
  });

  it('should openModalProfile ', () => {
    // Defina os valores de teste
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

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '340px';
    dialogConfig.maxWidth = '600px';
    dialogConfig.data = mockResponse;

    // Espione os métodos e simule o comportamento esperado
    spyOn(dialog, 'open').and.returnValue(dialogRefMock);

    const result = component.openModalProfile(mockResponse);

    // Verifique se o comportamento esperado ocorreu
    expect(dialog.open).toHaveBeenCalledWith(
      UserProfileComponent,
      dialogConfig
    );
    expect(result).toBe(dialogRefMock);
  });
});
