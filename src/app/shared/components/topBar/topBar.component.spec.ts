import {ComponentFixture, TestBed} from '@angular/core/testing'
import {TopBarComponent} from './topBar.component'
import {CommonModule} from '@angular/common'
import {RouterLink, RouterModule} from '@angular/router'
import {MemoizedSelector, StoreModule} from '@ngrx/store'
import {MockStore, provideMockStore} from '@ngrx/store/testing'
import {AuthService} from 'src/app/auth/services/auth.service'
import {By} from '@angular/platform-browser'
import {CurrentUserInterface} from '../../types/currentUser.interface'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {topBar} from '../../utils/constants'

let user: CurrentUserInterface = {
  email: 'someone@somewhear.com',
  token: 'string',
  username: 'user1',
  bio: null,
  image: null,
}

describe('TopBarComponent', () => {
  let component: TopBarComponent
  let fixture: ComponentFixture<TopBarComponent>
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TopBarComponent,
        CommonModule,
        RouterModule.forRoot([]),
        RouterLink,
      ],
      providers: [provideMockStore(), AuthService],
    })
    fixture = TestBed.createComponent(TopBarComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
    fixture.detectChanges()
  })
  afterEach(() => {
    store?.resetSelectors()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('user not logged in form has 3 fields', async () => {
    const form = fixture.debugElement.query(By.css('ul'))
    const fields = form.queryAll(By.css('li'))
    expect(fields.length).toEqual(3)
    expect(fields[0].nativeElement.innerText.trim()).toBe(topBar.HOME)
    expect(fields[1].nativeElement.innerText.trim()).toEqual(topBar.LOGIN)
    expect(fields[2].nativeElement.innerText.trim()).toBe(topBar.SIGNUP)
  })

  it('user logged in form has 4 fields', async () => {
    store.overrideSelector(selectCurrentUser, user)
    store.refreshState()
    fixture.detectChanges()
    const form = fixture.debugElement.query(By.css('ul'))
    const fields = form.queryAll(By.css('li'))
    expect(fields.length).toEqual(4)
    expect(fields[0].nativeElement.innerText.trim()).toBe(topBar.HOME)
    expect(fields[1].nativeElement.innerText.trim()).toEqual(topBar.NEW_POST)
    expect(fields[2].nativeElement.innerText.trim()).toBe(topBar.SETTINGS)
    expect(fields[3].nativeElement.innerText.trim()).toBe(user.username)
  })
})
