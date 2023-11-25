import {Component, Input, OnChanges, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Store} from '@ngrx/store'
import {feedActions} from './store/actions'
import {selectError, selectFeedData, selectIsLoading} from './store/reducers'
import {combineLatest} from 'rxjs'
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router'
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component'
import {LoadingComponent} from '../loading/loading.component'
import {environment} from 'src/environments/environment'
import {PaginationComponent} from '../pagination/pagination.component'
import queryString from 'query-string'
import {TagListComponent} from '../tagList/tagList.component'
import {SimpleChanges} from '@angular/core'
import {AddToFavoritesComponent} from '../../addToFavorites/add-to-favorites.component'

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent,
  ],
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = ''

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  })

  limit = environment.limit
  baseUrl = this.router.url.split('?')[0]
  currentPage: number = 0
  offset = 0

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({url: this.apiUrl}))
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1')
      this.fetchFeed()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue
    if (isApiUrlChanged) {
      this.fetchFeed()
    }
  }

  fetchFeed(): void {
    this.offset = this.currentPage * this.limit - this.limit
    const parsedUrl = queryString.parseUrl(this.apiUrl)
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset: this.offset,
      ...parsedUrl.query,
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}))
  }
}
