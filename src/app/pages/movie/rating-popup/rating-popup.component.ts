import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-rating-popup',
  templateUrl: './rating-popup.component.html',
  styleUrls: ['./rating-popup.component.scss'],
})
export class RatingPopupComponent {
  @Input() currentRating: number = 0;

  constructor(private popoverController: PopoverController) {}

  starCount: number[] = [1, 2, 3, 4, 5];

  selectRating(rating: number) {
    this.dismiss(rating);
  }

  dismiss(rating?: number) {
    this.popoverController.dismiss(rating);
  }
}
