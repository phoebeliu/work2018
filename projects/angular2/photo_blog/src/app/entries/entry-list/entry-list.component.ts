import { Component } from '@angular/core';

@Component({
    selector: 'app-entry-list',
    templateUrl: 'entry-list.component.html',
    styleUrls: ['entry-list.component.css']
})
export class EntryListComponent {
    // emoji: string[];
    // constructor() {
    //     this.emoji = ['🎉', '😍', '😜', '👍'];
    // }
    emoji = ['🎉', '😍', '😜', '👍'];
    activeEmoji: string;
    changeEmoji() {
        this.activeEmoji = this.emoji[Math.floor(Math.random() * this.emoji.length)];
        console.log(this.activeEmoji);
    }

}

