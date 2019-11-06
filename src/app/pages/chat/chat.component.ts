import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { DataService } from 'src/app/services/data.service';
import { Room, Message, RoomDetails, RoomMessages } from 'src/app/types';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE } from 'src/app/injection-tokens';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userName: string;
  rooms: Room[];
  messages: Message[];
  roomDetails: RoomDetails[] = [];
  selectedRoom: string = '';
  messagesByRoom: RoomMessages[] = [];
  onlineTime = 0;
  time = new Observable(observer => {
    observer.next(this.onlineTime);
    setInterval(() => observer.next(this.onlineTime++), 60000)
  });
  constructor(
    private http: HttpService,
    private data: DataService,
  ) {
  }

  ngOnInit() {
    this.getAllData();
    this.getUserName();
  }

  getUserName() {
    this.data.currentUser.subscribe(user => this.userName = user);
  }

  getAllData() {
    this.http.getAllRooms().subscribe(rs => {
      this.rooms = rs;
      this.selectedRoom = rs[0].name;
      this.rooms.forEach(element => {
        this.http.getRoomDetailsById(element.id).subscribe(roomDetail => this.roomDetails.push(roomDetail));
        this.http.getMessageByRoomId(element.id).subscribe(roomMessage => {
          this.messagesByRoom.push({ 'roomName': element.name, 'messages': roomMessage });
        });
      });
    });
  }

  getRoomId(roomName) {
    let room = this.roomDetails.filter(room => room.name === roomName);
    return room[0].id;
  }

  sendMessage(value, roomName) {
    const id = this.getRoomId(roomName);
    const message = { 'name': this.userName, 'message': value };
    this.http.postMessageByRoomId(id, message).subscribe(message => this.insertMessage(roomName, message));
  }

  insertMessage(rName, message) {
    this.messagesByRoom.forEach(m => {
      if (m.roomName === rName) {
        m.messages.push(message);
      }
    });
  }


}
