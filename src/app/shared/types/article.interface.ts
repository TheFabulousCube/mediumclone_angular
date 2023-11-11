import {PopularTagType} from './popularTag.type'
import {ProfileInterface} from './profile.interface'

export interface ArticleInterface {
  slug: string
  title: string
  description: string
  body: string
  tagList: PopularTagType[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: ProfileInterface
}
