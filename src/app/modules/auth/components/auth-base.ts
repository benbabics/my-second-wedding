import { Component } from '@angular/core';
import { User } from '../../models/user';

export class AuthBase {

  model: User;

  constructor() {
    this.resetModel();
  }

  handleSubmit(): void {
    this.makeRequest(this.model.email, this.model.password)
      .then(() => this.resetModel());
  }

  makeRequest(email: string, password: string): Promise<any> {
    return Promise.resolve();
  }

  private resetModel(): void {
    this.model = {
      email:    '',
      password: '',
    };
  }
}