import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {UserProfileInterface} from '../types/userProfile.interface'

export const userProfileActions = createActionGroup({
  source: 'userProfile',
  events: {
    'Get userProfile': props<{slug: string}>(),
    'Get userProfile success': props<{
      userProfile: UserProfileInterface
    }>(),
    'Get userProfile failure': emptyProps(),
  },
})
