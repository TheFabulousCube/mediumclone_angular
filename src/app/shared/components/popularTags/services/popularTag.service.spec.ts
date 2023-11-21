import {TestBed} from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import {PopularTagService} from './popularTag.service'
import {environment} from 'src/environments/environment'
import {PopularTagType} from 'src/app/shared/types/popularTag.type'

describe('PopularTagService', () => {
  let service: PopularTagService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PopularTagService],
    })

    service = TestBed.inject(PopularTagService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify() // Ensure that there are no outstanding requests
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should fetch popular tags', () => {
    const mockTags: PopularTagType[] = ['tag1', 'tag2', 'tag3']

    service.getPopularTags().subscribe((tags) => {
      expect(tags.length).toBe(3)
      expect(tags).toEqual(mockTags)
    })

    const req = httpMock.expectOne(`${environment.apiurl}/tags`)
    expect(req.request.method).toBe('GET')
    req.flush({tags: mockTags})
  })
})
