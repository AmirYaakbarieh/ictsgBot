import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { EditBotComponent } from './components/edit-bot/edit-bot.component';
import { UsermenuComponent } from './components/usermenu/usermenu.component';
import { ManagementMenuComponent } from './components/management-menu/management-menu.component';
import { WidgetComponent } from './components/widget/widget.component';

import { EmbeddableWidgetsModule } from '@acpaas-ui/ngx-embeddable-widgets';
import { ColorPaletteComponent } from './components/color-palette/color-palette.component';
import { ColorSliderComponent } from './components/color-slider/color-slider.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    NotFoundComponent,
    EditBotComponent,
    UsermenuComponent,
    ManagementMenuComponent,
    WidgetComponent,
    // ColorPaletteComponent,
    // ColorSliderComponent,
    // ColorPickerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressBarModule,
    MatCardModule,
    EmbeddableWidgetsModule,
    
    // ngx-translate and the loader module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    // NgMultiSelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
