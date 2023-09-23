import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {CurrentUserInterface} from 'src/app/shared/types/usercurrentUser.Interface'
import {RegisterRequestInterface} from '../types/registerRequest.interface'

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequestInterface}>(),
    'Register success': props<{currentUser: CurrentUserInterface}>(),
    'Register failure': emptyProps(),
  },
})

// export const register = createAction(
//   '[Auth] Register',
//   props<{request: RegisterRequestInterface}>()
// )

// export const registerSuccess = createAction(
//   '[Auth] Register Success',
//   props<{request: RegisterRequestInterface}>()
// )
// export const registerFailure = createAction(
//   '[Auth] Register Failure',
//   props<{request: RegisterRequestInterface}>()
// )
