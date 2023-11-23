import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {ArticleFormValuesIntrface} from './types/articleFormValues.interface'
import {BackendErrorMessages} from '../backendErrorMessages/backendErrorMessages.component'
import {FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms'
import {errors} from 'src/app/shared/utils/constants'
import {BackendErrorsInterface} from '../../types/backendErrors.interface'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
  standalone: true,
  imports: [BackendErrorMessages, CommonModule, ReactiveFormsModule],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesIntrface
  @Input() isSubmitting: boolean = false
  @Input() errors: BackendErrorsInterface | null = null

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesIntrface>()

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }
  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error(errors.InitializeFormError)
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    })
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue()
    const articleFormValues: ArticleFormValuesIntrface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    }
    this.articleSubmit.emit(articleFormValues)
  }
}
