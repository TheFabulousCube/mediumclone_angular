import {Component} from '@angular/core'
import {ArticleService} from 'src/app/shared/services/article.service'

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  providers: [ArticleService],
  standalone: true,
})
export class ArticleComponent {}
