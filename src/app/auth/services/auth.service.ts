import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/usercurrentUser.Interface'
import {map, Observable} from 'rxjs'
import {AuthResponseInterface} from '../types/authResponse.interface'
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiurl + '/users'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response) => response.user))
  }
}
