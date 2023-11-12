import {ComponentFixture, TestBed} from '@angular/core/testing'
import {CommonModule} from '@angular/common'
import {TagListComponent} from './tagList.component'

describe('TagListComponent', () => {
  let component: TagListComponent
  let fixture: ComponentFixture<TagListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagListComponent, CommonModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TagListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the correct number of tags', () => {
    component.tags = ['tag1', 'tag2', 'tag3']
    fixture.detectChanges()
    const tagElements = fixture.nativeElement.querySelectorAll('.tag-pill')
    expect(tagElements.length).toBe(3)
  })

  it('should display the correct tag names', () => {
    component.tags = ['tag1', 'tag2', 'tag3']
    fixture.detectChanges()
    const tagElements = fixture.nativeElement.querySelectorAll('.tag-pill')
    expect(tagElements[0].textContent).toContain('tag1')
    expect(tagElements[1].textContent).toContain('tag2')
    expect(tagElements[2].textContent).toContain('tag3')
  })
})
