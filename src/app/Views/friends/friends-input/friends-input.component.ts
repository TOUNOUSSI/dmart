import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation, ViewChild } from '@angular/core'

@Component({
  selector: 'friends-input',
  template: `
    <textarea type="text" class="friends-input-text" placeholder="Search for a friend ..."
              #message (keydown.enter)="onSubmit()" (keyup.enter)="message.value = ''" (keyup.escape)="dismiss.emit()"></textarea>
    <button type="submit" class="friends-input-submit" (click)="onSubmit()">
      {{buttonText}}
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./friends-input.component.css'],
})
export class FriendsInputComponent implements OnInit {
  @Input() public buttonText = '↩︎'
  @Input() public focus = new EventEmitter()
  @Output() public send = new EventEmitter()
  @Output() public dismiss = new EventEmitter()
  @ViewChild('message',null) message: ElementRef

  ngOnInit() {
    this.focus.subscribe(() => this.focusMessage())
  }

  public focusMessage() {
    this.message.nativeElement.focus()
  }

  public getMessage() {
    return this.message.nativeElement.value
  }

  public clearMessage() {
    this.message.nativeElement.value = ''
  }

  onSubmit() {
    const message = this.getMessage()
    if (message.trim() === '') {
      return
    }
    this.send.emit({ message })
    this.clearMessage()
    this.focusMessage()
  }

}
