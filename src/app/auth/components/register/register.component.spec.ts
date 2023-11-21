import {ComponentFixture, TestBed, async} from '@angular/core/testing'

import {RegisterComponent} from './register.component'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {RouterTestingModule} from '@angular/router/testing'
import {Store, StoreModule} from '@ngrx/store'
import {MockStore, provideMockStore} from '@ngrx/store/testing'
import {AuthService} from '../../services/auth.service'
import {By} from '@angular/platform-browser'
import {BackendErrorMessages} from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component'
import {selectIsSubmitting} from '../../store/reducers'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>
  let store: MockStore

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        RouterLink,
        CommonModule,
        StoreModule.forRoot({}),
        RouterTestingModule,
        BackendErrorMessages,
      ],
      providers: [provideMockStore({}), AuthService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have a form with username, email and password controls', () => {
    expect(component.form.contains('username')).toBeTrue()
    expect(component.form.contains('email')).toBeTrue()
    expect(component.form.contains('password')).toBeTrue()
  })

  it('form has 3 fields', async () => {
    const form = fixture.debugElement.query(By.css('form'))
    const fields = form.queryAll(By.css('input'))
    expect(fields.length).toEqual(3)
  })

  it('sets the initial values for the form', () => {
    const form = component.form
    const initialValues = {
      username: '',
      email: '',
      password: '',
    }
    expect(form.value).toEqual(initialValues)
  })

  it('email value and validation before', () => {
    const formUsernameElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[1]
    const emailValueFromGroup = component.form.get('email')
    expect(emailValueFromGroup?.value).toEqual(formUsernameElement.value)
  })

  it('password value and validation before', () => {
    const formPasswordElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[2]
    const passwordValueFromGroup = component.form.get('password')
    expect(passwordValueFromGroup?.value).toEqual(formPasswordElement.value)
  })

  it('username value and validation after', () => {
    const form: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('form')
    const usernameField = form.querySelectorAll('input')[0]
    const emailField = form.querySelectorAll('input')[1]
    const passwordField = form.querySelectorAll('input')[2]
    usernameField.value = 'mockUser'
    emailField.value = 'mock@email.com'
    passwordField.value = 'password123'
    usernameField.dispatchEvent(new Event('input'))
    emailField.dispatchEvent(new Event('input'))
    passwordField.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    const usernameValueFromGroup = component.form.get('username')
    const emailValueFromGroup = component.form.get('email')
    const passwordValueFromGroup = component.form.get('password')
    expect(usernameValueFromGroup?.value).toEqual(usernameField.value)
    expect(emailValueFromGroup?.value).toEqual(emailField.value)
    expect(passwordValueFromGroup?.value).toEqual(passwordField.value)
    expect(component.form.valid).toBeTruthy()
    expect(emailValueFromGroup?.errors?.['required'].toBeTruthy())
    expect(emailValueFromGroup?.errors?.['email'].toBeTruthy())
    expect(passwordValueFromGroup?.errors?.['required'].toBeTruthy())
  })

  it('should make the form invalid if any control is empty', () => {
    component.form.setValue({
      username: '',
      email: '',
      password: '',
    })
    expect(component.form.valid).toBeFalse()
  })

  it('should make the form valid if all controls have a value', () => {
    component.form.setValue({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    })
    expect(component.form.valid).toBeTrue()
  })
})
