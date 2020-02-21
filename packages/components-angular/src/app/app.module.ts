import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { AppBasicComponent } from './app-basic/app-basic.component';
import { AppActionComponent } from './app-action/app-action.component';
import { AppFeedbackComponent } from './app-feedback/app-feedback.component';
import { AppIconComponent } from './app-icon/app-icon.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    AppBasicComponent,
    AppActionComponent,
    AppFeedbackComponent,
    AppIconComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    PorscheDesignSystemModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
