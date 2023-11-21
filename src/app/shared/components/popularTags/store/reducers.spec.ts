import {popularTagsReducer, initialState} from './reducers'
import {popularTagsActions} from './actions'

describe('popularTagsReducer', () => {
  it('should return the initial state', () => {
    const action = {type: 'NOOP'} as any
    const result = popularTagsReducer(initialState, action)

    expect(result).toBe(initialState)
  })

  it('should set isLoading to true for getPopularTags action', () => {
    const action = popularTagsActions.getPopularTags()
    const result = popularTagsReducer(initialState, action)

    expect(result.isLoading).toBe(true)
  })

  it('should set isLoading to false and update data for getPopularTagsSuccess action', () => {
    const action = popularTagsActions.getPopularTagsSuccess({
      popularTags: ['tag1', 'tag2', 'tag3'],
    })
    const result = popularTagsReducer(initialState, action)

    expect(result.isLoading).toBe(false)
    expect(result.data).toEqual(['tag1', 'tag2', 'tag3'])
  })

  it('should set isLoading to false for getPopularTagsFailure action', () => {
    const action = popularTagsActions.getPopularTagsFailure()
    const result = popularTagsReducer(initialState, action)

    expect(result.isLoading).toBe(false)
  })
})
