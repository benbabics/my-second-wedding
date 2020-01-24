import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { IAccount } from '../interfaces/account.interface';
import { SessionService } from '../../auth/services/session.service';

@Injectable()
export class AccountProviderService {

  $snapshot: Observable<any> = Observable.create(
    observer => this.collection.onSnapshot(data => observer.next(data))
  );

  get collection(): any {
    return this.db.collection('accounts').doc(this.session.uid);
  }

  constructor(
    private db: AngularFirestore,
    private session: SessionService,
  ) { }

  createAccount(account: IAccount): Promise<any> {
    return this.collection.add(account);
  }
}