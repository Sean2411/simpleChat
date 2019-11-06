import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { LandingComponent } from './landing/landing.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const DECLARATIONS = [
  LandingComponent,
  ChatComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS]
})
export class PagesModule { }
