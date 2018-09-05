import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EntryListComponent } from './entries'

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, EntryListComponent],
    bootstrap: [AppComponent]
})

export class AppModule {

}