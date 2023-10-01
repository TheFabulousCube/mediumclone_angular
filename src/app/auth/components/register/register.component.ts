import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {authActions} from '../../store/actions'
import {selectIsSubmitting} from '../../store/reducers'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['' /*Validators.required*/],
    email: ['' /*[Validators.email, Validators.required]*/],
    password: [''],
  })
  isSubmitting$ = this.store.select(selectIsSubmitting)

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({request}))
  }

  get username() {
    return this.form.controls['username']
  }
  get email() {
    return this.form.controls['email']
  }
  get password() {
    return this.form.controls['password']
  }
}
