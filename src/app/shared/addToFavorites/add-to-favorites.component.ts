import {Component, Input} from '@angular/core'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'mc-add-to-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-favorites.component.html',
})
export class AddToFavoritesComponent {
  @Input() isFavorited: boolean = false
  @Input() favoritesCount: number = 0
  @Input() articleSlug: string = ''

  handleLike(): void {
    if (this.isFavorited) {
      this.favoritesCount--
    } else {
      this.favoritesCount++
    }

    this.isFavorited = !this.isFavorited
  }
}
