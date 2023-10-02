import {CommonModule} from '@angular/common'
import {Component, Input, OnInit} from '@angular/core'
import {BackendErrorsInterface} from '../../types/backendErrors.interface'

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessages implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {}

  errorMessages: string[] = []

  ngOnInit(): void {
    // this.errorMessages = ['bread', 'fruit']
    console.log('backend error component', Object.keys(this.backendErrors))
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name]
      return `${messages}`
    })
  }
}
