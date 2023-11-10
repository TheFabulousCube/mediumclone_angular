import {Component, Input, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Store} from '@ngrx/store'
import {feedActions} from './store/actions'
import {selectError, selectFeedData, selectIsLoading} from './store/reducers'
import {combineLatest} from 'rxjs'
import {RouterModule} from '@angular/router'
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component'
import {LoadingComponent} from '../loading/loading.component'

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ErrorMessageComponent,
    LoadingComponent,
  ],
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = ''

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  })

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({url: this.apiUrl}))
  }
}
