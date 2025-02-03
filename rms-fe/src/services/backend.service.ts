import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private readonly httpClient: HttpClient;
  private readonly backendUrl: string;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    if (environment.backendUrl.endsWith('/')) {
      this.backendUrl = environment.backendUrl.substring(0, environment.backendUrl.length - 1);
    } else {
      this.backendUrl = environment.backendUrl;
    }
  }

  public async get<T>(path: string, params: any = null): Promise<T> {
    var request = this.httpClient.get(`${this.backendUrl}/${path}`, { params: params });
    var result = await lastValueFrom(request).catch((error) => { return error; });
    if (result instanceof HttpErrorResponse) {
      throw result;
    }
    return result;
  }

  public async post<T>(path: string, data: any = null): Promise<T> {
    var request = this.httpClient.post(`${this.backendUrl}/${path}`, data);
    var result = await lastValueFrom(request).catch((error) => { return error; });
    if (result instanceof HttpErrorResponse) {
      throw result;
    }
    return result;
  }
}
