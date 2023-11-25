import {ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {AddToFavoritesComponent} from './add-to-favorites.component'

describe('AddToFavoritesComponent', () => {
  let component: AddToFavoritesComponent
  let fixture: ComponentFixture<AddToFavoritesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToFavoritesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AddToFavoritesComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should increment favoritesCount and toggle isFavorited when handleLike is called and isFavorited is false', () => {
    component.isFavorited = false
    component.favoritesCount = 0
    component.handleLike()
    expect(component.isFavorited).toBe(true)
    expect(component.favoritesCount).toBe(1)
  })

  it('should decrement favoritesCount and toggle isFavorited when handleLike is called and isFavorited is true', () => {
    component.isFavorited = true
    component.favoritesCount = 1
    component.handleLike()
    expect(component.isFavorited).toBe(false)
    expect(component.favoritesCount).toBe(0)
  })
})
