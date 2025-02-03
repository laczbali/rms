import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly backend: BackendService;

  constructor(backend: BackendService) {
    this.backend = backend;
  }

  public async login(email: string, password: string): Promise<void> {

  }

  public async register(email: string, displayname: string, password: string): Promise<void> {
  }

  public async logout(): Promise<void> {
  }

  public async isAuthenticated(): Promise<boolean> {
    return false;
  }

}
