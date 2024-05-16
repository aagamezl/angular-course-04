import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: string[] = [];

  constructor() { }

  add (message: string) {
    this.messages.push(message)
  }

  clear () {
    this.messages = [];
  }

  get () {
    return this.messages;
  }
}
