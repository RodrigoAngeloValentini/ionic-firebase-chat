import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Chat } from '../models/chat.model';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class ChatService extends BaseService {
  constructor(public af: AngularFire, public http: Http) {
    super();
  }

  create(chat: Chat, userId1: string, userId2: string): firebase.Promise<void> {
    return this.af.database
      .object(`/chats/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }

  getDeepChat(
    userId1: string,
    userId2: string,
  ): FirebaseObjectObservable<Chat> {
    return <FirebaseObjectObservable<Chat>>(
      this.af.database
        .object(`/chats/${userId1}/${userId2}`)
        .catch(this.handleObservableError)
    );
  }
}
