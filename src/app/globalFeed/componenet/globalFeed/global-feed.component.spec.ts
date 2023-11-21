import {ComponentFixture, TestBed} from '@angular/core/testing'
import {CommonModule} from '@angular/common'
import {FeedComponent} from 'src/app/shared/components/feed/feed.component'
import {BannerComponent} from 'src/app/shared/components/banner/banner.component'
import {GlobalFeedComponent} from './global-feed.component'
import {provideMockStore} from '@ngrx/store/testing'
import {AuthService} from 'src/app/auth/services/auth.service'
import {RouterTestingModule} from '@angular/router/testing'
import {PopularTagsComponent} from 'src/app/shared/components/popularTags/popularTags.component'

describe('GlobalFeedComponent', () => {
  let component: GlobalFeedComponent
  let fixture: ComponentFixture<GlobalFeedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GlobalFeedComponent,
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
    fixture = TestBed.createComponent(GlobalFeedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have apiUrl property set to "/articles"', () => {
    expect(component.apiUrl).toEqual('/articles')
  })
})
