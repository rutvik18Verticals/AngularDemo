import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPasswordChecker]',
  standalone: true
})
export class PasswordCheckerDirective {
  @Input({required:true}) messageSpanId:string = '';
  constructor(private el:ElementRef) { }
  @HostListener('keydown',['$event'])
  onKeydown(event:any){
    let el = document.getElementById(this.messageSpanId)
    let msgToDisplay = '';
    let password = event.target.value;
    if (password && password.length <= 5) {
      msgToDisplay = "Average"
      el?.style.setProperty('color','red')
    }
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(password.length > 5 && password.length < 8 && format.test(password)){
      msgToDisplay = "Good"
      el?.style.setProperty('color','blue')
    }

    if(password.length >= 8 && format.test(password)){
      msgToDisplay = "Strong"
      el?.style.setProperty('color','green')

    }
    if (el) {
      el.innerText = msgToDisplay
    }
  }
}
