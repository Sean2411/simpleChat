import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ChatComponent } from './pages/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { LOCAL_STORAGE } from './injection-tokens';
import { localStorageFactory } from './global-factories';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LandingComponent },
      { path: 'chat', component: ChatComponent },
    ]),
    HttpClientModule,
  ],
  providers: [
    { provide: LOCAL_STORAGE, useFactory: localStorageFactory },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
