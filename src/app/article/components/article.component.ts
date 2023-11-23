import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {filter, map} from 'rxjs/operators'
import {ArticleService} from 'src/app/shared/services/article.service'
import {articleActions} from '../store/actions'
import {combineLatest} from 'rxjs'
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../store/reducers'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {CommonModule} from '@angular/common'
import {ErrorMessageComponent} from 'src/app/shared/components/errorMessage/errorMessage.component'
import {LoadingComponent} from 'src/app/shared/components/loading/loading.component'
import {TagListComponent} from 'src/app/shared/components/tagList/tagList.component'

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  providers: [ArticleService],
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    TagListComponent,
  ],
  standalone: true,
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== undefined
        )
      ),
  }).pipe(
    map(({article, currentUser}) => {
      if (!article || !currentUser) {
        return false
      }
      return article.author.username === currentUser.username
    })
  )
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  })

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}))
  }
  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({slug: this.slug}))
  }
}
