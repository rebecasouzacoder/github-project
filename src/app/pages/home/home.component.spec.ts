import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { GithubService } from 'src/app/core/github-service/github.service';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { PagesModule } from '../pages.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let githubService: GithubService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule,
      PagesModule],
      declarations: [HomeComponent],
      providers: [GithubService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
  });

  it('observableApi return true', () => {
    const mockErrorEvent = true;
    spyOn(githubService, 'getEventError').and.returnValue(of(mockErrorEvent));

    component.ngOnInit();

    expect(component.error).toBeTrue();
  });

  it('observableApi return false', () => {
    const mockErrorEvent = false;
    spyOn(githubService, 'getEventError').and.returnValue(of(mockErrorEvent));

    component.ngOnInit();

    expect(component.error).toBeFalse();
  });
});
