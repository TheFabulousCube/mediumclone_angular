import {isDevMode} from '@angular/core'
import {bootstrapApplication} from '@angular/platform-browser'
import {provideRouter} from '@angular/router'
import {provideState, provideStore} from '@ngrx/store'
import {AppComponent} from './app/app.component'
import {appRoutes} from './app/app.routes'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {authFeatureKey, authReducer} from './app/auth/store/reducers'
import {provideHttpClient} from '@angular/common/http'
import {provideEffects} from '@ngrx/effects'
import * as authEffects from './app/auth/store/effects'
import {provideRouterStore, routerReducer} from '@ngrx/router-store'

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer,
    }),
    provideState(authFeatureKey, authReducer),
    provideEffects(authEffects),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
})
