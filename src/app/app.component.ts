import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SessionService } from './libs/auth/services/session.service';
import { Observable, of } from 'rxjs';
import { flatMap, map, mergeAll, mergeMap, tap } from 'rxjs/operators';
import parseDomain from 'parse-domain';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  constructor(
    private db: AngularFirestore,
    private session: SessionService,
  ) {
    (window as any).db = db; // temp
  }

  ngOnInit() {
    if (this.session.isSignedIn) {
      this.initUserData();
    }
    else {
      const { subdomain } = parseDomain(window.location.hostname);
      this.initProjectData(subdomain);
    }
  }

  private initProjectData(subdomain: string): void {
    this.getProjectBySubdomain(subdomain)
      .pipe(
        mergeAll(),
      )
      .subscribe(project => console.log('project', project));
  }

  private initUserData(): void {
    this.getUser()
      .pipe(
        tap(user          => console.log('user', user)),
        flatMap(({ uid }) => this.getMembership(uid)),
        tap(memberships   => console.log('memberships', memberships)),
        mergeAll(),
        mergeMap(({ account_id, project_id, role }) => this.getProjectByAccount(account_id, project_id)
          .pipe(map(project => ({ role, ...project })))
        ),
      )
      .subscribe(project => console.log('project', project));
  }

  private getUser(): Observable<any> {
    return this.db.collection('users').doc(this.session.uid)
      .snapshotChanges()
      .pipe(
        map(({ payload }) => ({ uid: payload.id, ...payload.data() })),
      );
  }

  private getMembership(uid: string): Observable<any> {
    return this.db.collection('memberships', ref => ref.where('user_id', '==', uid))
      .snapshotChanges()
      .pipe(
        map(data => data.map(({ payload }) => ({ id: payload.doc.id, ...payload.doc.data() }))),
      );
  }

  private getProjectByAccount(accountId: string, projectId: string): Observable<any> {
    return this.db.doc(`accounts/${accountId}/projects/${projectId}`)
      .snapshotChanges()
      .pipe(
        map(({ payload }) => ({ id: payload.id, ...payload.data() })),
      );
  }

  private getProjectBySubdomain(subdomain: string): Observable<any> {
    return this.db.collectionGroup('projects', ref => ref.where('subdomain', '==', subdomain))
      .snapshotChanges()
      .pipe(
        map(data => data.map(({ payload }) => ({ id: payload.doc.id, ...payload.doc.data() }))),
      );
  }
}
