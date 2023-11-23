import {Component} from '@angular/core'
import {ArticleFormComponent} from 'src/app/shared/components/articleForm/articleForm.component'
import {ArticleFormValuesIntrface} from 'src/app/shared/components/articleForm/types/articleFormValues.interface'

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  standalone: true,
  imports: [ArticleFormComponent],
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }

  isSubmitting = false

  errors = {}

  onSubmit(articleFormValues: ArticleFormValuesIntrface): void {
    console.log('articleInput', articleFormValues)
  }
}
