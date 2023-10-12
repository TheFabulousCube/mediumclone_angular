import {ComponentFixture, TestBed} from '@angular/core/testing'
import {AppComponent} from './app.component'
import {RouterModule, RouterOutlet} from '@angular/router'
import {TopBarComponent} from './shared/components/topBar/topBar.component'
import {MockStore, provideMockStore} from '@ngrx/store/testing'
import {StoreModule} from '@ngrx/store'
import {AuthService} from './auth/services/auth.service'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let store: MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterOutlet,
        AppComponent,
        RouterModule.forRoot([]),
        TopBarComponent,
      ],
      providers: [provideMockStore({}), AuthService],
      declarations: [],
    }).compileComponents()
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
    fixture.detectChanges()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
