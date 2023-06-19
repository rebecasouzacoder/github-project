import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IError } from 'src/app/shared/models/error';
import { IUserByIdResponse } from 'src/app/shared/models/userById-response';
import { IUsersResponse } from 'src/app/shared/models/users-response';
import { environment } from 'src/environments/environment.prod';



@Injectable()
export class GithubService {
  public eventSubject: Subject<IUsersResponse> = new Subject<IUsersResponse>();
  public eventLoading: Subject<boolean> = new Subject<boolean>();
  public eventError: Subject<IError> = new Subject<IError>();

  constructor(private http: HttpClient) {}

  public emitEvent(eventName?: string, page?: number): void {
    this.emitEventLoading(true);
    this.emitEventError({error: false});

    this.getUsers(eventName, page).subscribe(
      (result) => {
        this.eventSubject.next(result);
      },
      () => this.emitEventError({error: true}),
      () => this.emitEventLoading(false)
    );
  }

  public emitEventLoading(loading: boolean): void {
    this.eventLoading.next(loading);
  }

  public emitEventError(error: IError): void {
    this.eventError.next(error);
  }

  public getEventError(): Observable<IError> {
    return this.eventError.asObservable();
  }

  public getEvent(): Observable<IUsersResponse> {
    return this.eventSubject.asObservable();
  }

  public getEventLoading(): Observable<boolean> {
    return this.eventLoading.asObservable();
  }

  get headers() {
    const dto = {
      headers: {
        accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    };
    return dto;
  }

  getUsers(search?: string, page?: number): Observable<IUsersResponse> {
    return this.http.get<IUsersResponse>(
      `${environment.api_url}search/users?q=${search ? search : 'a'}&page=${
        page ? page : 1
      }&per_page=20`,
      this.headers
    );
  }

  getUserById(user: string): Observable<IUserByIdResponse> {
    return this.http.get<IUserByIdResponse>(
      `${environment.api_url}users/${user}`,
      this.headers
    );
  }
}
