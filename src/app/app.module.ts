import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityService } from 'src/shared/services/utility.service';
import { WebApiService } from 'src/shared/services/web-api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConst } from './app.config';
import { LayoutModule } from './layout/layout.module';
import { PoemModule } from './poem/poem.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTooltipModule,
    MatSnackBarModule,
    LayoutModule,
    PoemModule
  ],
  // schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AppConst,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConst) => () => config.load(),
      deps: [AppConst],
      multi: true
    },
    WebApiService,
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
