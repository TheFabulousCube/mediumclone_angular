import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {combineLatest} from 'rxjs'
import {authActions} from '../../store/actions'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers'
import {LoginRequestInterface} from '../../types/loginRequest.interface'
import {BackendErrorMessages} from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component'

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['' /*[Validators.email, Validators.required]*/],
    password: [''],
  })
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.login({request}))
  }

  get email() {
    return this.form.controls['email']
  }
  get password() {
    return this.form.controls['password']
  }
}
