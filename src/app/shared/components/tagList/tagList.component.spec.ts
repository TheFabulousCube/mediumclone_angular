import {ComponentFixture, TestBed} from '@angular/core/testing'

import {TagListComponent} from './tagList.component'

describe('TagListComponent', () => {
  let component: TagListComponent
  let fixture: ComponentFixture<TagListComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TagListComponent],
    })
    fixture = TestBed.createComponent(TagListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
