import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Chores} from "./app.component";
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'create-todo-form',
  templateUrl: 'create-todo-form.component.html'
})
export class CreateToDoForm {

  constructor(
    public dialogRef: MatDialogRef<CreateToDoForm>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string; position: number; name: string; time: number; }
  )
  {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
