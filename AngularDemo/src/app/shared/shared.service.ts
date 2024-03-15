import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public currentActiveNav = signal<string>('Dashboard');
  public currentActiveNavIcon = signal<string>('fa-tachometer');
  constructor() { }


}
