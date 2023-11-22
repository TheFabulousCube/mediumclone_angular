import {ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {Store, StoreModule} from '@ngrx/store'
import {of} from 'rxjs'
import {FeedTogglerComponent} from './feedToggler.component'
import {RouterTestingModule} from '@angular/router/testing'
import {feed} from '../../utils/constants'

describe('FeedTogglerComponent', () => {
  let component: FeedTogglerComponent
  let fixture: ComponentFixture<FeedTogglerComponent>
  let store: Store
  const constants = feed

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        FeedTogglerComponent,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [Store],
    }).compileComponents()

    store = TestBed.inject(Store)
    spyOn(store, 'select').and.returnValue(of({}))

    fixture = TestBed.createComponent(FeedTogglerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display feed toggler', () => {
    fixture.detectChanges()
    const feedToggler = fixture.debugElement.query(By.css('.feed-toggler'))
    expect(feedToggler).toBeTruthy()
  })

  it('should display selected tag when a tag is selected', () => {
    const tagName = 'tag1'
    component.tagName = tagName
    fixture.detectChanges()
    const feedToggler = fixture.nativeElement.querySelector('.feed-toggler')
    expect(feedToggler.textContent).toContain(tagName)
  })

  it('should NOT display Your Feed when user NOT logged in', () => {
    component.tagName = 'tag1'
    component.currentUser$ = of(null)
    fixture.detectChanges()
    const feedToggler = fixture.nativeElement.querySelector('.feed-toggler')
    expect(feedToggler.textContent).toContain(feed.GLOBAL_FEED)
    expect(feedToggler.textContent).not.toContain(feed.USER_FEED)
  })

  it('should display Your Feed when user logged in', () => {
    component.tagName = 'tag1'
    component.currentUser$ = of({
      username: 'user1',
      email: 'user1@example.com',
      token: 'token123',
      bio: 'User 1 bio',
      image: 'user1.jpg',
    })
    fixture.detectChanges()
    const feedToggler = fixture.nativeElement.querySelector('.feed-toggler')
    expect(feedToggler.textContent).toContain(feed.GLOBAL_FEED)
    expect(feedToggler.textContent).toContain(feed.USER_FEED)
  })
})
