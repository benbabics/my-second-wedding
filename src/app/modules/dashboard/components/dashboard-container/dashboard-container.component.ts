import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionService } from '../../../../libs/auth/services/session.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent {

  get email(): string {
    return this.session.currentUser.email;
  }

  constructor(
    private db: AngularFirestore,
    private session: SessionService,
  ) { }

  expectUserProfile() {
    const doc = {
      firstName: 'Ben',
      lastName:  'Babics',

      accounts: [
        {
          id:          'account-one',
          name:        'Account One',
          description: 'lorem ipsum...',
        },
        {
          id:          'account-two',
          name:        'Account Two',
          description: 'lorem ipsum...',
        }
      ],
    }
  }

  expectUserAccount() {
    const doc = {
      id:          'account-one',
      name:        'Account One',
      description: 'lorem ipsum...',

      '@roles':    [],
      '@projects': [],
    };
  }

  projectBySubdomain() {
    this.db.collectionGroup('projects', ref => ref.where('subdomain', '==', 'our-first-wedding'))
      .valueChanges()
      .subscribe(projects => {
        const project = projects.find((project: any) => project.subdomain === 'our-first-wedding');
        console.log('project', project);
      });
  }
}