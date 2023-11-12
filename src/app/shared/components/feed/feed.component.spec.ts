import {ComponentFixture, TestBed} from '@angular/core/testing'
import {
  ActivatedRoute,
  convertToParamMap,
  Params,
  RouterModule,
} from '@angular/router'
import {of} from 'rxjs'
import {provideMockStore, MockStore} from '@ngrx/store/testing'

import {FeedComponent} from './feed.component'
import {PaginationComponent} from '../pagination/pagination.component'
import {TagListComponent} from '../tagList/tagList.component'

import {from} from 'rxjs'
import {feedActions} from './store/actions'
import {CommonModule} from '@angular/common'
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component'
import {LoadingComponent} from '../loading/loading.component'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'
import {ArticleInterface} from '../../types/article.interface'
import {RouterTestingModule} from '@angular/router/testing'

const testArticle1: ArticleInterface = {
  slug: 'test-article1',
  title: 'Test Article1',
  description: 'This is a test article1',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  tagList: ['test', 'article1'],
  createdAt: '2022-01-01T00:00:00.000Z',
  updatedAt: '2022-01-01T00:00:00.000Z',
  favorited: false,
  favoritesCount: 0,
  author: {
    username: 'testuser',
    bio: 'This is a test user',
    image: 'https://via.placeholder.com/150',
    following: false,
  },
}

const testArticle2: ArticleInterface = {
  slug: 'test-article2',
  title: 'Test Article2',
  description: 'This is a test article2',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  tagList: ['test', 'article2'],
  createdAt: '2022-01-01T00:00:00.000Z',
  updatedAt: '2022-01-01T00:00:00.000Z',
  favorited: false,
  favoritesCount: 0,
  author: {
    username: 'testuser',
    bio: 'This is a test user',
    image: 'https://via.placeholder.com/150',
    following: false,
  },
}

class ActivatedRouteStub {
  get queryParams() {
    return of({})
  }
}

describe('FeedComponent', () => {
  let component: FeedComponent
  let fixture: ComponentFixture<FeedComponent>
  let store: MockStore
  const initialState = {
    isLoading: false,
    error: null,
    feed: null,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        ErrorMessageComponent,
        LoadingComponent,
        PaginationComponent,
        TagListComponent,
      ],
      providers: [
        provideMockStore({initialState}),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(convertToParamMap({page: '1'})),
          },
        },
      ],
    }).compileComponents()
    store = TestBed.inject(MockStore)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should dispatch getFeed action on init', () => {
    spyOn(store, 'dispatch')
    component.ngOnInit()
    expect(store.dispatch).toHaveBeenCalledWith(feedActions.getFeed({url: ''}))
  })

  xit('should update currentPage on queryParam change', () => {
    const queryParams = {page: '2'}
    const route = TestBed.inject(ActivatedRoute)
    spyOnProperty(route, 'queryParams').and.returnValue(of(queryParams))
    component.fetchFeed()
    expect(component.currentPage).toEqual(5)
  })

  it('should calculate offset correctly', () => {
    component.currentPage = 2
    component.fetchFeed()
    expect(component.offset).toEqual(2)
  })

  it('should render feed items when feed is not null', () => {
    const feed = {
      data: {articles: [testArticle1, testArticle2], articlesCount: 2},
    }
    store.setState({...initialState, feed})
    fixture.detectChanges()
    const feedItems = fixture.nativeElement.querySelectorAll('.article-meta')
    expect(feedItems.length).toEqual(feed.data.articles.length)
  })
})
