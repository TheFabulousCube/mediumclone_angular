import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {GetFeedResponseInterface} from '../types/getFeedResponse.interface'
import {environment} from 'src/environments/environment'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = environment.apiurl + url
    return this.http.get<GetFeedResponseInterface>(fullUrl)
  }
}
