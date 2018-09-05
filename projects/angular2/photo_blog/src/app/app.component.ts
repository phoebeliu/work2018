import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
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

