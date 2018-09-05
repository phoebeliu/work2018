import { Component, Input } from '@angular/core';
import { Entry } from '../service/entry.model';
@Component({
    selector: 'app-entry',
    templateUrl: 'entry.component.html',
    styleUrls: ['entry.component.css']
})
export class EntryComponent {

    // title: string = "the photo";
    // photo: string = "http://placehold.it/800x500?text=angular";
    // description: string = "woobub";
    // comments: any[] = [
    //     { name: "liu er zi", text: "baby" },
    //     { name: "liu san zi", text: "hi" },
    //     { name: "liu si zi", text: "waht's up" }
    // ];
    @Input() entry: Entry;


}

