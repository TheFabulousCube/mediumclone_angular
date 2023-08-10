import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: [''],
    email: [''],
    password: [''],
  })
  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log('form', this.form.getRawValue())
  }
}
