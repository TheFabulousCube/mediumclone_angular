import {TestBed} from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

import {environment} from 'src/environments/environment'
import {AddToFavoritesService} from './addToFavorites.service'
import {ArticleInterface} from '../../types/article.interface'
import {ProfileInterface} from '../../types/profile.interface'
import {HttpClient} from '@angular/common/http'

const mockAuthor: ProfileInterface = {
  username: 'test-username',
  bio: 'test-bio',
  image: 'test-image',
  following: false,
}

const mockArticle: ArticleInterface = {
  slug: 'test-slug',
  title: 'Test Article',
  description: 'Test Description',
  body: 'Test Body',
  tagList: ['tag1', 'tag2'],
  createdAt: '',
  updatedAt: '',
  favorited: false,
  favoritesCount: 0,
  author: mockAuthor,
}

describe('AddToFavoritesService', () => {
  let service: AddToFavoritesService
  let httpClient: HttpClient
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddToFavoritesService],
    })

    service = TestBed.inject(AddToFavoritesService)
    httpClient = TestBed.inject(HttpClient)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify() // Ensure that there are no outstanding requests
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should add to favorites', () => {
    const slug = 'test-slug'
    mockArticle.favorited = false

    service.addToFavorites(slug).subscribe({
      next: (data) => data,
      error: fail,
    })

    const req = httpMock.expectOne(
      `${environment.apiurl}/articles/${slug}/favorite`
    )
    expect(req.request.method).toBe('POST')
    req.flush({article: mockArticle})
  })

  it('should remove from favorites', () => {
    const slug = 'test-slug'
    mockArticle.favorited = true

    service.removeFromFavorites(slug).subscribe({
      next: (data) => data,
      error: fail,
    })

    const req = httpMock.expectOne(
      `${environment.apiurl}/articles/${slug}/favorite`
    )
    expect(req.request.method).toBe('DELETE')
    req.flush({article: mockArticle})
  })
})
