import {Component} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FeedComponent} from 'src/app/shared/components/feed/feed.component'
import {BannerComponent} from 'src/app/shared/components/banner/banner.component'
import {PopularTagsComponent} from 'src/app/shared/components/popularTags/popularTags.component'

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  imports: [CommonModule, FeedComponent, BannerComponent, PopularTagsComponent],
  templateUrl: './global-feed.component.html',
})
export class GlobalFeedComponent {
  apiUrl = '/articles'
}
