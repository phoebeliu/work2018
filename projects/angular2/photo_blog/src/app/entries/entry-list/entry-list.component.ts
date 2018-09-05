import { Component, OnInit } from '@angular/core';
// import { Http } from '@angular/http';
import { EntryService } from '../service/entry.service';
import { Entry } from '../service/entry.model';
@Component({
    selector: 'app-entry-list',
    templateUrl: 'entry-list.component.html',
    styleUrls: ['entry-list.component.css']
})
export class EntryListComponent implements OnInit {
    entries: Entry[];
    // constructor(http: Http) {
    //     http.get('./app/entries').toPromise()
    //         .then(response => { debugger }, error => { debugger })
    // }
    constructor(private entryService: EntryService) {

    }
    ngOnInit() {
        this.entryService
            .getEntries()
            .then(data => this.entries = data);
    }

}

