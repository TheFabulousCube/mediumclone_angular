import {ComponentFixture, TestBed} from '@angular/core/testing'
import {CommonModule} from '@angular/common'
import {BackendErrorMessages} from './backendErrorMessages.component'
import {BackendErrorsInterface} from '../../types/backendErrors.interface'

describe('BackendErrorMessages', () => {
  let component: BackendErrorMessages
  let fixture: ComponentFixture<BackendErrorMessages>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BackendErrorMessages],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendErrorMessages)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  xit('should display error messages', () => {
    const backendErrors: BackendErrorsInterface = {
      email: ['Email is invalid', 'Email is required'],
      password: ['Password is required'],
    }
    component.backendErrors = backendErrors
    fixture.detectChanges()
    const errorElements = fixture.nativeElement.querySelector('.error-messages')
    expect(errorElements.textContent).toContain('Email is invalid')
    expect(errorElements.textContent).toContain('Email is required')
    expect(errorElements.textContent).toContain('Password is required')
  })

  it('should not display error messages if backendErrors is empty', () => {
    component.backendErrors = {}
    fixture.detectChanges()
    const errorElements =
      fixture.nativeElement.querySelectorAll('.error-messages li')
    expect(errorElements.length).toBe(0)
  })
})
