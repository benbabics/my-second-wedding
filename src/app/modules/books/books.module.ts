import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';

import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule,
  ],
  declarations: [
    BookListComponent,
    BookDetailComponent,
  ],
  providers: []
})
export class BooksModule { }