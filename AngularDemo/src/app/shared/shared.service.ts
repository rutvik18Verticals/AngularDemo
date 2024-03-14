import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public currentActiveNav = signal<string>('Dashboard');
  constructor() { }


}
