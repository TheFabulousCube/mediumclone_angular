import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {environment} from 'src/environments/environment'
import {ArticleInterface} from '../types/article.interface'
import {ArticleResponseInterface} from '../types/articleResponse.interface'

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiurl}/articles/${slug}`
    return this.http
      .get<ArticleResponseInterface>(fullUrl)
      .pipe(map((response: ArticleResponseInterface) => response.article))
  }
}
