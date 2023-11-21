import {Component, OnInit} from '@angular/core'
import {combineLatest} from 'rxjs'
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers'
import {Store} from '@ngrx/store'
import {popularTagsActions} from './store/actions'
import {CommonModule} from '@angular/common'
import {LoadingComponent} from '../loading/loading.component'
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  [x: string]: any
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    popularTags: this.store.select(selectPopularTagsData),
  })

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags())
  }
}
