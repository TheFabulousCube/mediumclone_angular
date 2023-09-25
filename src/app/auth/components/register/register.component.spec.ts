import {ComponentFixture, TestBed} from '@angular/core/testing'

import {RegisterComponent} from './register.component'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {RouterTestingModule} from '@angular/router/testing'
import {Store, StoreModule} from '@ngrx/store'
import {AuthService} from '../../services/auth.service'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        RouterLink,
        CommonModule,
        StoreModule.forRoot({}),
        RouterTestingModule,
      ],
      providers: [Store, AuthService],
    })
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
