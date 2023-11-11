import {Component, Input, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {UtilsService} from '../../services/utils.service'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'mc-pagination',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pagination.component.html',
  styles: [],
})
export class PaginationComponent implements OnInit {
  @Input() total: number = 1
  @Input() limit: number = 20
  @Input() url: string = ''
  @Input() currentPage: number = 1

  pagesCount: number = 1

  pages: number[] = []

  constructor(private utils: UtilsService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit)
    this.pages = this.pagesCount > 0 ? this.utils.range(1, this.pagesCount) : []
    console.log('total: ', this.total)
    console.log('limit: ', this.limit)
    console.log('pages count: ', this.pagesCount)
    console.log('range: ', this.utils.range(1, this.pagesCount))
  }
}
