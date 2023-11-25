import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {UserProfileService} from '../services/userProfile.service'
import {userProfileActions} from './actions'
import {UserProfileInterface} from '../types/userProfile.interface'
import {switchMap, map, catchError, of, tap} from 'rxjs'
import {GetUserProfileResponseInterface} from '../types/getUserProfileResponse.interface'

export const getUserProfileEffect = createEffect(
  (
    actions$ = inject(Actions),
    userProfileService = inject(UserProfileService)
  ) => {
    return actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({slug}) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((userProfile: UserProfileInterface) => {
            return userProfileActions.getUserProfileSuccess({userProfile})
          }),
          catchError(() => {
            return of(userProfileActions.getUserProfileFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
