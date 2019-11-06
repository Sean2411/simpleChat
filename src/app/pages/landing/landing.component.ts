import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from 'src/app/injection-tokens';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  buttonData = {
    type: 'landing',
    content: 'Join the DoorDash Chat!'
  }
  inputData = {
    type: 'landing',
    placeholder: 'Type your username...'
  }
  userName: string = '';
  model: any = {};
  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  enterChatRoom(userName) {
    this.dataService.passValue(userName);
    this.router.navigateByUrl('chat');
    this.dataService.saveToLocalStorage(userName);
  }

}
