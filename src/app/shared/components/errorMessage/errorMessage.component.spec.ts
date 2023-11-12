import {ComponentFixture, TestBed} from '@angular/core/testing'
import {ErrorMessageComponent} from './errorMessage.component'

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent
  let fixture: ComponentFixture<ErrorMessageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the default error message', () => {
    const messageElement = fixture.nativeElement.querySelector('div')
    expect(messageElement.textContent).toContain('Something went wrong')
  })

  it('should display a custom error message', () => {
    component.message = 'Custom error message'
    fixture.detectChanges()
    const messageElement = fixture.nativeElement.querySelector('div')
    expect(messageElement.textContent).toContain('Custom error message')
  })
})
