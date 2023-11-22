import {ComponentFixture, TestBed} from '@angular/core/testing'
import {CommonModule} from '@angular/common'
import {FeedComponent} from 'src/app/shared/components/feed/feed.component'
import {BannerComponent} from 'src/app/shared/components/banner/banner.component'
import {YourFeedComponent} from './your-feed.component'
import {provideMockStore} from '@ngrx/store/testing'
import {AuthService} from 'src/app/auth/services/auth.service'
import {RouterTestingModule} from '@angular/router/testing'
import {PopularTagsComponent} from 'src/app/shared/components/popularTags/popularTags.component'

describe('YourFeedComponent', () => {
  let component: YourFeedComponent
  let fixture: ComponentFixture<YourFeedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        YourFeedComponent,
        FeedComponent,
        BannerComponent,
        CommonModule,
        RouterTestingModule,
        PopularTagsComponent,
      ],
      providers: [provideMockStore({}), AuthService],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(YourFeedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have apiUrl property set to "/articles"', () => {
    expect(component.apiUrl).toEqual('/articles/feed')
  })
})
