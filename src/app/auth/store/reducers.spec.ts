import {authReducer, initialState} from './reducers'
import {authActions} from './actions'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {
  SerializedRouterStateSnapshot,
  routerNavigationAction,
} from '@ngrx/router-store'
import {EventType, RoutesRecognized} from '@angular/router'

const currentUser: CurrentUserInterface = {
  username: 'testUser',
  email: 'test@test.com',
  token: 'token',
  bio: null,
  image: null,
}

const request: RegisterRequestInterface = {
  user: {
    username: 'testUser',
    email: 'test@email.com',
    password: 'testPassword',
  },
}

describe('Auth reducer', () => {
  it('should return initial state', () => {
    const state = authReducer(undefined, {} as any)
    expect(state).toEqual(initialState)
  })

  describe('Register', () => {
    it('should set Submitting is true and clear errors', () => {
      const state = authReducer(initialState, authActions.register({request}))
      expect(state.isSubmitting).toBeTruthy()
      expect(state.validationErrors).toBeNull()
    })

    it('should set currentUser on Register Success', () => {
      const state = authReducer(
        initialState,
        authActions.registerSuccess({currentUser})
      )
      expect(state.isSubmitting).toBeFalsy()
      expect(state.currentUser).toEqual(currentUser)
    })

    it('should set validationErrors on Register Failure', () => {
      const errors = {email: ['invalid email']}
      const state = authReducer(
        initialState,
        authActions.registerFailure({errors})
      )
      expect(state.isSubmitting).toBeFalsy()
      expect(state.validationErrors).toEqual(errors)
    })
  })

  describe('Get Current User', () => {
    it('should set Loading is true', () => {
      const state = authReducer(initialState, authActions.getCurrentUser())
      expect(state.isLoading).toBeTruthy()
    })

    it('should set currentUser on Get Current User Success', () => {
      const state = authReducer(
        initialState,
        authActions.getCurrentUserSuccess({currentUser})
      )
      expect(state.isLoading).toBeFalsy()
      expect(state.currentUser).toEqual(currentUser)
    })

    it('should clear current user on Get Current User Failure', () => {
      const state = authReducer(
        initialState,
        authActions.getCurrentUserFailure()
      )
      expect(state.isLoading).toBeFalsy()
      expect(state.currentUser).toBeNull()
    })
  })

  describe('Login', () => {
    it('should set Submitting is true and clear errors', () => {
      const state = authReducer(initialState, authActions.login({request}))
      expect(state.isSubmitting).toBeTruthy()
      expect(state.validationErrors).toBeNull()
    })

    it('should set currentUser on Login Success', () => {
      const state = authReducer(
        initialState,
        authActions.loginSuccess({currentUser})
      )
      expect(state.currentUser).toEqual(currentUser)
    })

    it('should set validationErrors on loginFailure', () => {
      const errors = {email: ['invalid email']}
      const state = authReducer(
        initialState,
        authActions.loginFailure({errors})
      )
      expect(state.validationErrors).toEqual(errors)
    })
  })

  it('should reset validationErrors on routerNavigationAction', () => {
    const mockRouterState: SerializedRouterStateSnapshot = {
      url: '/test',
      root: null as any,
    }
    const mockRoutesRecognized: RoutesRecognized = {
      id: 1,
      url: '/test',
      urlAfterRedirects: '/test',
      state: mockRouterState,
      type: EventType.RoutesRecognized,
    }
    const state = authReducer(
      {...initialState, validationErrors: {email: ['invalid email']}},
      routerNavigationAction({
        payload: {routerState: mockRouterState, event: mockRoutesRecognized},
      })
    )
    expect(state.validationErrors).toEqual(null)
  })
})
