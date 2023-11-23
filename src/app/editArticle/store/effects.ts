import {inject} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {switchMap, map, catchError, of, tap} from 'rxjs'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {editArticleActions} from './actions'
import {Router} from '@angular/router'
import {EditArticleService} from '../services/editArticle.service'
import {ArticleService as SharedArticleService} from 'src/app/shared/services/article.service'
import {HttpErrorResponse} from '@angular/common/http'

export const getArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(editArticleActions.getArticle),
      switchMap(({slug}) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.getArticleSuccess({article})
          }),
          catchError(() => {
            return of(editArticleActions.getArticleFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
export const updateArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    editArticleService = inject(EditArticleService)
  ) => {
    return actions$.pipe(
      ofType(editArticleActions.updateArticle),
      switchMap(({request, slug}) => {
        return editArticleService.updateArticle(slug, request).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.updateArticleSuccess({article})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              editArticleActions.updateArticleFailure({
                errors: errorResponse.error.error,
              })
            )
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterUpdateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(editArticleActions.updateArticleSuccess),
      tap(({article}) => {
        router.navigate(['/articles', article.slug])
      })
    )
  },
  {functional: true, dispatch: false}
)
