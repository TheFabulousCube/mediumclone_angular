import {ComponentFixture, TestBed, async} from '@angular/core/testing'

import {LoginComponent} from './login.component'
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

describe('Login Component', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let store: MockStore

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginComponent,
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
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('form has 2 fields', async () => {
    const form = fixture.debugElement.query(By.css('form'))
    const fields = form.queryAll(By.css('input'))
    expect(fields.length).toEqual(2)
  })

  it('sets the initial values for the form', () => {
    const form = component.form
    const initialValues = {
      email: '',
      password: '',
    }
    expect(form.value).toEqual(initialValues)
  })

  it('email value and validation before', () => {
    const formUsernameElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[0]
    const emailValueFromGroup = component.form.get('email')
    expect(emailValueFromGroup?.value).toEqual(formUsernameElement.value)
    expect(emailValueFromGroup?.errors).toBeNull()
    expect(emailValueFromGroup?.errors?.['required'].toBeTruthy())
    expect(emailValueFromGroup?.errors?.['email'].toBeTruthy())
  })

  it('email value and validation after', () => {
    const form: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('form')
    const emailField = form.querySelectorAll('input')[0]
    emailField.value = 'mock@email.com'
    emailField.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    const emailValueFromGroup = component.form.get('email')
    expect(emailValueFromGroup?.value).toEqual(emailField.value)
    expect(component.form.valid).toBeTruthy()
    expect(emailValueFromGroup?.errors?.['required'].toBeTruthy())
    expect(emailValueFromGroup?.errors?.['email'].toBeTruthy())
  })
})
