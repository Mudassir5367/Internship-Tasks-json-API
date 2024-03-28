import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'] 
})
export class ModalComponent {
  editPostData: any = {}; // Define editPostData here
  @Output() updateData = new EventEmitter<any>(); 

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Assign data passed from parent to editPostData
    this.editPostData = { id : data.id ,title: data.title, body: data.body };
  }

  submitEditForm(): void {
    // Implement logic to submit edited form data
    this.dialogRef.close(this.editPostData);
  }
}
