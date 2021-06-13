import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket = io('http://localhost:3001', {
    withCredentials: true,
  });

  joinRoom(data) {
    this.socket.emit('new user', data);
    console.log(data);
  }

  newUserJoined() {
    let observable = new Observable<any>((observer) => {
      this.socket.on('new user', function (data) {
        observer.next((user) => console.log(user));
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  addToUsersBox = (userName) => {
      console.log(userName);
      
    return userName;
  };

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    let observable = new Observable<any>(
      (observer) => {
        this.socket.on('offline', (data) => {
          observer.next(user => console.log(user));
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );

    return observable;
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('new message', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );

    return observable;
  }
}
