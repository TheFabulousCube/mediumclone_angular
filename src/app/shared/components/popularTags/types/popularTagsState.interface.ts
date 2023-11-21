import {PopularTagType} from 'src/app/shared/types/popularTag.type'
import {GetPopularTagsResponseInterface} from './getPopularTagsResponse.interface'

export interface PopularTagsStateInterface {
  isLoading: boolean
  error: string | null
  data: PopularTagType[] | null
}
