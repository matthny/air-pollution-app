import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CitiesComponent } from './components/cities/cities.component'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonToggleModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule, MatNativeDateModule, MatSelectModule, MatTableModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CitiesComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
