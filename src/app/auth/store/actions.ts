import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'
import {LoginRequestInterface} from '../types/loginRequest.interface'
import {CurrentUserRequestInterface} from 'src/app/shared/types/currentUserRequest.interface'

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequestInterface}>(),
    'Register success': props<{currentUser: CurrentUserInterface}>(),
    'Register failure': props<{errors: BackendErrorsInterface}>(),

    Login: props<{request: LoginRequestInterface}>(),
    'Login success': props<{currentUser: CurrentUserInterface}>(),
    'Login failure': props<{errors: BackendErrorsInterface}>(),

    'Get Current User': emptyProps(),
    'Get Current User success': props<{currentUser: CurrentUserInterface}>(),
    'Get Current User failure': emptyProps(),

    'Update Current User': props<{
      currentUserRequest: CurrentUserRequestInterface
    }>(),
    'Update Current User success': props<{currentUser: CurrentUserInterface}>(),
    'Update Current User failure': props<{errors: BackendErrorsInterface}>(),
  },
})
