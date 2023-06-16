import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSearchComponent } from './card-search.component';
import { GithubService } from 'src/app/core/github-service/github.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

describe('CardSearchComponent', () => {
  let component: CardSearchComponent;
  let fixture: ComponentFixture<CardSearchComponent>;
  let githubService: GithubService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule],
      declarations: [CardSearchComponent],
      providers: [GithubService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSearchComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
    fixture.detectChanges();
  });

  it('emitEvent', () => {
    // Definir um valor para a propriedade searchCamp
    component.searchCamp = 'searchValue';

    // Chamar o método emitEvent
    component.emitEvent();
  });
});
