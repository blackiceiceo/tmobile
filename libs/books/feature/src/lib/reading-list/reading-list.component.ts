import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, addToReadingList, markedAsFinishedReading, resetUpdateMarkedAsFinished } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  checked: Boolean;

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));

    this.openSnackBar({
      message: "Book is being removed from Reading List",
      action: "Undo",
      options: {
        duration: 5000,
        verticalPosition: 'top'
      }
    }).onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({book: item}));

      item = {
        ...item,
        finished: !item.finished
      };
      this.store.dispatch(resetUpdateMarkedAsFinished({item}));
    });

  }

  onFinishedBook(event, item) {
    this.store.dispatch(markedAsFinishedReading({item}));
  }

  openSnackBar(option: any) {
    const { message, action, options } = option;
    return this.snackBar.open(message, action, options);
  }
}
