import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Entry } from '../service/entry.model';
import { Http } from '@angular/http';
import { EntryService } from '../service/entry.service';
@Component({
    selector: 'app-entry-comment-form',
    templateUrl: 'entry-comment-form.component.html',
    styleUrls: ['entry-comment-form.component.css']
})
export class EntryCommentFormComponent {
    name: string = "";
    comment: string = "";
    constructor(private EntryService: EntryService) {

    }
    @Input() entryId: number;
    @Output() onCommentAdded = new EventEmitter<{ name: string, comment: string }>();
    @ViewChild('commentForm') commentForm: NgForm;
    onSubmit(commentForm: NgForm) {
        if (this.commentForm.invalid) return;
        //debugger;
        let comment = { name: this.name, comment: this.comment };
        this.EntryService.addComment(this.entryId, comment)
            .then(() => {
                this.onCommentAdded.emit(comment);
                this.commentForm.resetForm();
            })

    }
}

