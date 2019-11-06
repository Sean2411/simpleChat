import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Message, Room, RoomDetails } from '../types';
import { catchError } from 'rxjs/operators';
import {
  Observable,
  throwError as observableThrowError,
  of,
} from 'rxjs';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private endpoint = 'http://localhost:8080/api/rooms';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getAllRooms() {
    return this.http.get<Room[]>(
      this.endpoint
    )
  }

  getRoomDetailsById(id: number) {
    return this.http.get<RoomDetails>(
      `${this.endpoint}/${id}`
    )
  }

  getMessageByRoomId(id: number) {
    return this.http.get<Message[]>(
      `${this.endpoint}/${id}/messages`
    )
  }

  postMessageByRoomId(id: number, body: Message) {
    console.log(`${this.endpoint}/${id}/messages`);
    const url = `${this.endpoint}/${id}/messages`;
    console.log('body===', body);
    return this.http.post<Message>(
      url,
      body,
      httpOptions
    )
    .pipe(
      catchError(this.handleError<Message>('postMessageByRoomId'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
