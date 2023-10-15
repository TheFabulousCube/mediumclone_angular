import {Component} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Store} from '@ngrx/store'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {combineLatest} from 'rxjs'
import {RouterLink} from '@angular/router'
import {topBar} from '../../utils/constants'

@Component({
  selector: 'mc-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './topBar.component.html',
})
export class TopBarComponent {
  readonly constants = topBar
  data$ = combineLatest({
    currentUser$: this.store.select(selectCurrentUser),
  })
  constructor(private store: Store) {}
}
