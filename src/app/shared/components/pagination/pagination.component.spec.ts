import {ComponentFixture, TestBed} from '@angular/core/testing'
import {CommonModule} from '@angular/common'
import {RouterTestingModule} from '@angular/router/testing'
import {UtilsService} from '../../services/utils.service'
import {PaginationComponent} from './pagination.component'

describe('PaginationComponent', () => {
  let component: PaginationComponent
  let fixture: ComponentFixture<PaginationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, CommonModule, RouterTestingModule],
      providers: [UtilsService],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should calculate the correct number of pages', () => {
    component.total = 100
    component.limit = 20
    component.ngOnInit()
    expect(component.pagesCount).toBe(5)
    expect(component.pages).toEqual([1, 2, 3, 4, 5])
  })

  it('should handle zero total', () => {
    component.total = 0
    component.limit = 20
    component.ngOnInit()
    expect(component.pagesCount).toBe(0)
    expect(component.pages).toEqual([])
  })

  it('should handle non-zero current page', () => {
    component.total = 100
    component.limit = 20
    component.currentPage = 3
    component.ngOnInit()
    expect(component.pagesCount).toBe(5)
    expect(component.pages).toEqual([1, 2, 3, 4, 5])
  })
})
