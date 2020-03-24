import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';
import { NavigationComponent } from './pages/navigation.component';
import { BasicComponent } from './pages/basic.component';
import { ActionComponent } from './pages/action.component';
import { ContentComponent } from './pages/content.component';
import { FormComponent } from './pages/form.component';
import { FeedbackComponent } from './pages/feedback.component';
import { IconComponent } from './pages/icon.component';
import { LayoutComponent } from './pages/layout.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BasicComponent,
    ActionComponent,
    ContentComponent,
    FormComponent,
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
