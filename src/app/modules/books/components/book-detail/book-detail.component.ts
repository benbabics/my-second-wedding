import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators'
import { find, includes, pick } from 'lodash';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {

  showCharacterSelection: boolean;
  characters;
  characterIds: string[];

  get bookId(): string {
    return this.activatedRoute.snapshot.params.bookId;
  }

  get listableCharacters(): any[] {
    return this.characters.filter(c => includes(this.characterIds, c.id));
  }

  get selectableCharacters(): any[] {
    return this.characters.filter(c => !includes(this.characterIds, c.id));
  }

  constructor(
    private db: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    this.characters   = [];
    this.characterIds = [];
    this.showCharacterSelection = false;
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        tap(()       => this.spinner.show()),
        tap(()       => this.showCharacterSelection = false),
        switchMap(() => this.fetchCharactersByBook()),
        tap(()       => this.spinner.hide()),
        shareReplay(1),
      )
      .subscribe(
        characterIds => this.characterIds = characterIds,
        err => console.error('error', err),
      );

    this.db.collection('characters')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))),
      )
      .subscribe(characters => this.characters = characters);
  }

  characterAdd(characterId: string): void {
    this.characterUpdate(characterId, this.bookId);
  }

  characterRemove(characterId: string): void {
    this.characterUpdate(characterId, null);
  }

  private characterUpdate(characterId: string, book: string): void {
    this.db.doc(`characters/${characterId}`)
      .update({ book });
  }

  private fetchCharactersByBook(): Observable<any> {
    return this.db.collection(`characters`, query => query.where('book', '==', this.bookId))
      .snapshotChanges()
      .pipe(
        map(actions      => actions.map(a => a.payload.doc.id )),
        tap(characterIds => console.log('characterIds', characterIds)),
      )
  }
}