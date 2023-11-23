import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {ArticleService as SharedArticleService} from 'src/app/shared/services/article.service'
import {articleActions} from './actions'
import {switchMap, map, catchError, of, tap} from 'rxjs'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {ArticleService} from '../services/article.services'
import {Router} from '@angular/router'

export const getArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({slug}) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return articleActions.getArticleSuccess({article})
          }),
          catchError(() => {
            return of(articleActions.getArticleFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const deleteArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticle),
      switchMap(({slug}) => {
        return articleService.deleteArticle(slug).pipe(
          map(() => {
            return articleActions.deleteArticleSuccess()
          }),
          catchError(() => {
            return of(articleActions.deleteArticleFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterDeleteEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticleSuccess),
      tap(() => {
        router.navigate(['/'])
      })
    )
  },
  {functional: true, dispatch: false}
)
