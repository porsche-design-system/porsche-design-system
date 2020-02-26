import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { BasicComponent } from './pages/basic/basic.component';
import { ActionComponent } from './pages/action/action.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { IconComponent } from './pages/icon/icon.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BasicComponent,
    ActionComponent,
    FeedbackComponent,
    IconComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    PorscheDesignSystemModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
