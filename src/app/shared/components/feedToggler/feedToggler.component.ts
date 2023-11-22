import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'
import {RouterLink, RouterLinkActive} from '@angular/router'
import {Store} from '@ngrx/store'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {feed} from '../../utils/constants'

@Component({
  selector: 'mc-feed-toggler',
  standalone: true,
  templateUrl: './feedToggler.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class FeedTogglerComponent {
  @Input() tagName?: string

  readonly constants = feed
  currentUser$ = this.store.select(selectCurrentUser)

  constructor(private store: Store) {}
}
