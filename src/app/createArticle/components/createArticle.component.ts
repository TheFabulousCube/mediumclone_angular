import {Component} from '@angular/core'
import {ArticleFormComponent} from 'src/app/shared/components/articleForm/articleForm.component'
import {ArticleFormValuesIntrface} from 'src/app/shared/components/articleForm/types/articleFormValues.interface'
import {selectIsSubmitting, selectValidationErrors} from '../store/reducers'
import {combineLatest} from 'rxjs'
import {Store} from '@ngrx/store'
import {ArticleRequestInterface} from 'src/app/shared/types/articleRequest.interface'
import {createArticleActions} from '../store/actions'
import {CommonModule} from '@angular/common'
import {BackendErrorMessages} from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component'

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, BackendErrorMessages],
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }

  constructor(private store: Store) {}

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  onSubmit(articleFormValues: ArticleFormValuesIntrface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    }
    this.store.dispatch(createArticleActions.createArticle({request}))
  }
}
