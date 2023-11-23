import {Component, OnInit} from '@angular/core'
import {ArticleFormComponent} from 'src/app/shared/components/articleForm/articleForm.component'
import {ArticleFormValuesIntrface} from 'src/app/shared/components/articleForm/types/articleFormValues.interface'
import {
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers'
import {Observable, combineLatest, filter, map} from 'rxjs'
import {Store, select} from '@ngrx/store'
import {ArticleRequestInterface} from 'src/app/shared/types/articleRequest.interface'
import {editArticleActions} from '../../store/actions'
import {CommonModule} from '@angular/common'
import {LoadingComponent} from 'src/app/shared/components/loading/loading.component'
import {ActivatedRoute} from '@angular/router'
import {ArticleInterface} from 'src/app/shared/types/article.interface'

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, LoadingComponent],
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleFormValuesIntrface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }
    })
  )
  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  data$ = combineLatest({
    article: this.store.select(selectArticle),
    isLoading: this.store.select(selectIsLoading),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    initialValues: this.initialValues$,
  })

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({slug: this.slug}))
  }
  onSubmit(articleFormValues: ArticleFormValuesIntrface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    }
    this.store.dispatch(
      editArticleActions.updateArticle({request, slug: this.slug})
    )
  }
}
