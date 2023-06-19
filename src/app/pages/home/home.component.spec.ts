import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { GithubService } from 'src/app/core/github-service/github.service';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { PagesModule } from '../pages.module';
import { IError } from 'src/app/shared/models/error';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let githubService: GithubService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, PagesModule],
      declarations: [HomeComponent],
      providers: [GithubService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
  });

  it('should observableApi', () => {
    // Defina os valores de teste
    const mockError: IError = { error: true, message: '' };

    // Espione os métodos e simule o comportamento esperado
    spyOn(githubService, 'getEventError').and.returnValue(of(mockError)); // Use RxJS 'of' para criar um observable com um resultado simulado
    spyOn(githubService, 'emitEventLoading');

    // Chame o método sendo testado
    component.ngOnInit();

    // Verifique se o comportamento esperado ocorreu
    expect(component.error).toBe(mockError);
    expect(githubService.emitEventLoading).toHaveBeenCalledWith(false);
  });
});
