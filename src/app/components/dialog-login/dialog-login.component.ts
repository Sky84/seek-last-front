import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
    nickname: string;
}

@Component({
    selector: 'app-dialog-login',
    templateUrl: './dialog-login.component.html',
    styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent {
    public nickname: string = "";
    constructor(
        public dialogRef: MatDialogRef<DialogLoginComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
