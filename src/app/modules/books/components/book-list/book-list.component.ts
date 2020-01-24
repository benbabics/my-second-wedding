import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  get paramBookId(): string {
    return this.activatedRoute.snapshot.params.bookId;
  }

  get selectedBook(): any {
    console.log('selectedBook', this.books.map(book => book.id), this.router);
    return this.books.find(book => book.id === this.paramBookId);
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.setupBooks();
    this.setupCharacters();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private makeRequest(request: Promise<any>): Promise<any> {
    this.spinner.show();
    return request.finally(() => this.spinner.hide());
  }

  /*
   * Books
  */
  bookName: string;
  booksCollection: AngularFirestoreCollection;
  books: any[] = [];

  bookCreate(): void {
    this.makeRequest(
      this.booksCollection
        .add({ title: this.bookName })
        .then(() => this.bookName = '')
    );
  }

  bookDestroy(book): void {
    this.makeRequest(
      this.booksCollection.doc(book.id).delete()
    );
  }

  private setupBooks(): void {
    this.bookName = '';
    this.booksCollection = this.db.collection('books', ref => ref.orderBy('title'));

    this.booksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))),
      tap(books   => console.log('books', books)),
      takeUntil(this.unsubscribe$),
    )
    .subscribe(books => this.books = books);
  }

  /*
   * Characters
  */
  characterName: string;
  charactersCollection: AngularFirestoreCollection;
  characters: any[] = [];

  characterCreate(): void {
    this.makeRequest(
      this.charactersCollection
        .add({ name: this.characterName })
        .then(() => this.characterName = '')
    );
  }

  characterDestroy(character): void {
    this.makeRequest(
      this.charactersCollection.doc(character.id).delete()
    )
  }

  private setupCharacters(): void {
    this.characterName = '';
    this.charactersCollection = this.db.collection('characters', ref => ref.orderBy('name'));
    
    this.charactersCollection.snapshotChanges().pipe(
      map(actions    => actions.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))),
      tap(characters => console.log('characters', characters)),
      takeUntil(this.unsubscribe$),
    )
    .subscribe(characters => this.characters = characters);
  }
}