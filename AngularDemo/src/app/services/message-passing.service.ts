import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagePassingService {
  private message = new Subject<any>();
  constructor() { }

  sendMessage(message:any){
    this.message.next(message);
  }
  getMessage(){
    return this.message.asObservable();
  }
}
