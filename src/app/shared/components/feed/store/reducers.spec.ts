import {feedFeature, initialState} from './reducers'
import {FeedStateInterface} from '../types/feedState.interface'
import {GetFeedResponseInterface} from '../types/getFeedResponse.interface'
import {
  SerializedRouterStateSnapshot,
  routerNavigationAction,
} from '@ngrx/router-store'
import {
  EventType,
  type RouterStateSnapshot,
  type RoutesRecognized,
} from '@angular/router'
import * as fromFeed from './actions'

describe('Feed Reducers', () => {
  let testinitialState: FeedStateInterface

  beforeEach(() => {
    testinitialState = {...initialState}
  })

  it('should change state when get feed', () => {
    const result = feedFeature.reducer(
      testinitialState,
      fromFeed.feedActions.getFeed({url: 'https://example.com/feed'})
    )
    expect(result.isLoading).toEqual(true)
  })

  it('should change state when get feed Success', () => {
    const result = feedFeature.reducer(
      testinitialState,
      fromFeed.feedActions.getFeedSuccess({
        feed: {articles: [], articlesCount: 0} as GetFeedResponseInterface,
      })
    )
    expect(result.isLoading).toEqual(false)
    expect(result.data).toEqual({articles: [], articlesCount: 0})
  })

  it('should change state when get feed failure', () => {
    const result = feedFeature.reducer(
      testinitialState,
      fromFeed.feedActions.getFeedFailure()
    )
    expect(result.isLoading).toEqual(false)
  })

  it('should reset state on router navigation', () => {
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
    const result = feedFeature.reducer(
      testinitialState,
      routerNavigationAction({
        payload: {
          event: mockRoutesRecognized,
          routerState: mockRouterState,
        },
      })
    )
    expect(result).toEqual(testinitialState)
  })
})
