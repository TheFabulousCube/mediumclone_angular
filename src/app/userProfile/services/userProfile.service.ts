import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {UserProfileInterface} from '../types/userProfile.interface'
import {environment} from 'src/environments/environment'
import {GetUserProfileResponseInterface} from '../types/getUserProfileResponse.interface'

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    const url = `${environment.apiurl}/profiles/${slug}`

    return this.http
      .get<GetUserProfileResponseInterface>(url)
      .pipe(map((response) => response.profile))
  }
}
