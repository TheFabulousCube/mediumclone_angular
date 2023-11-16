import {ComponentFixture, TestBed} from '@angular/core/testing'
import {Store, StoreModule} from '@ngrx/store'
import {BackendErrorMessages} from './backendErrorMessages.component'
import {BackendErrorsInterface} from '../../types/backendErrors.interface'

describe('BackendErrorMessages', () => {
  let component: BackendErrorMessages
  let fixture: ComponentFixture<BackendErrorMessages>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackendErrorMessages, StoreModule.forRoot({})],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendErrorMessages)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display error messages from the store', () => {
    const errors: BackendErrorsInterface = {
      email: ['Email is invalid', 'Email is already taken'],
      password: ['Password is too short'],
    }
    component.backendErrors = errors
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('.error-messages').textContent).toContain(
      'Email is invalid'
    )
    expect(compiled.querySelector('.error-messages').textContent).toContain(
      'Email is already taken'
    )
    expect(compiled.querySelector('.error-messages').textContent).toContain(
      'Password is too short'
    )
  })
})
