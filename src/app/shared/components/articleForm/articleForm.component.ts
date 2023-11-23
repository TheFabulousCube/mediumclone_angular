import {Component, EventEmitter, Input, Output} from '@angular/core'
import {ArticleFormValuesIntrface} from './types/articleFormValues.interface'
import {BackendErrorMessages} from '../backendErrorMessages/backendErrorMessages.component'

@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
  standalone: true,
})
export class ArticleFormComponent {
  @Input() initialValues?: ArticleFormValuesIntrface
  @Input() isSubmitting: boolean = false
  @Input() errors: BackendErrorMessages | null = null

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesIntrface>()
}
