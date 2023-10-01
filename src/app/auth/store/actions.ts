import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequestInterface}>(),
    'Register success': props<{currentUser: CurrentUserInterface}>(),
    'Register failure': props<{errors: BackendErrorsInterface}>(),
  },
})
