import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { EntryListComponent, EntryComponent, EntryService } from './entries'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryEntryService } from './backend';
@NgModule({
    imports: [BrowserModule, HttpModule, InMemoryWebApiModule.forRoot(InMemoryEntryService)],
    // declarations: [AppComponent, EntryListComponent, EntryComponent],
    // always put your child component first
    providers: [EntryService],
    declarations: [AppComponent, EntryComponent, EntryListComponent,],
    bootstrap: [AppComponent]
})

export class AppModule {

}