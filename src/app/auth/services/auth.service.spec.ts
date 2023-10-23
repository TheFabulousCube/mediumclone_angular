import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import {AuthService} from './auth.service'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {TestBed} from '@angular/core/testing'
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'
import {LoginRequestInterface} from '../types/loginRequest.interface'

const mockRegister: RegisterRequestInterface = {
  user: {
    username: 'mockUser',
    email: 'mock@test.com',
    password: 'mockPass',
  },
}

const mockLogin: LoginRequestInterface = {
  user: {
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
      .subscribe((data) => expect(data).toEqual(mockRegister))

    const req = httpTestingController.expectOne(testUrl)
    expect(req.request.method).toEqual('GET')

    req.flush(mockRegister)
    httpTestingController.verify()
  })

  describe('get user', () => {
    it('should return user', () => {
      const user = service.getUser({user: mockResult})
      expect(user).toEqual(mockResult)
    })
  })

  describe('get current user', () => {
    it('should return current user', () => {
      const currentUser = service.getCurrentUser().subscribe({
        next: (data) => data,
        error: fail,
      })

      const req = httpTestingController.expectOne(
        'https://api.realworld.io/user'
      )
      expect(req.request.method).toEqual('GET')
      expect(req.request.headers).toEqual(new HttpHeaders())
    })
  })

  describe('register user', () => {
    it('Register should return value from observable', () => {
      service.register(mockRegister).subscribe({
        next: (data) => data,
        error: fail,
      })

      const req = httpTestingController.expectOne(testUrl)
      expect(req.request.method).toEqual('POST')
      expect(req.request.body).toEqual(mockRegister)
    })
  })

  describe('login user', () => {
    it('Login should return value from observable', () => {
      service.login(mockLogin).subscribe({
        next: (data) => data,
        error: fail,
      })

      const req = httpTestingController.expectOne(testUrl + '/login')
      expect(req.request.method).toEqual('POST')
      expect(req.request.body).toEqual(mockLogin)
    })
  })
})
