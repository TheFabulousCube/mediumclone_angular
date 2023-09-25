import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import {AuthService} from './auth.service'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/usercurrentUser.Interface'
import {TestBed} from '@angular/core/testing'
import {HttpClient, HttpResponse} from '@angular/common/http'

const mockData: RegisterRequestInterface = {
  user: {
    username: 'mockUser',
    email: 'mock@test.com',
    password: 'mockPass',
  },
}

const mockResult: CurrentUserInterface = {
  email: 'mock@test.com',
  token: 'mockToken',
  username: 'mockUser',
  bio: null,
  image: null,
}

const testUrl = 'https://api.realworld.io/users'

describe('AuthService', () => {
  let service: AuthService
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    })
    service = TestBed.inject(AuthService)
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('can test HttpClient.get', () => {
    httpClient
      .get<RegisterRequestInterface>(testUrl)
      .subscribe((data) => expect(data).toEqual(mockData))

    const req = httpTestingController.expectOne(testUrl)
    expect(req.request.method).toEqual('GET')

    req.flush(mockData)
    httpTestingController.verify()
  })

  it('Post should return value from observable', () => {
    service.register(mockData).subscribe({
      next: (data) => data,
      error: fail,
    })

    const req = httpTestingController.expectOne(testUrl)
    expect(req.request.method).toEqual('POST')
    expect(req.request.body).toEqual(mockData)

    const expectedResponse = new HttpResponse({
      status: 200,
      statusText: 'OK',
      body: mockResult,
    })
    req.event(expectedResponse)
  })
})
