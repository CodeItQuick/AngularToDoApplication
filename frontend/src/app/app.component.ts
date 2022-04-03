import {ChangeDetectorRef, Component, Inject, Input, NgZone} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {ToDoService} from "./app.service";
import {Observable, of, timeout} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateToDoForm} from "./create-todo-form.component";
import {MatTableDataSource} from "@angular/material/table";

export interface Chores {
  _id: string;
  name: string;
  time?: number;
  position?: number;
  edit?: string;
  delete?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name: string = '';
  time: number = 0;
  title = 'todo';
  displayedColumns: string[] = ['position', 'name', 'time', 'edit', 'delete'];
  dataSource: MatTableDataSource<Chores> = new MatTableDataSource<Chores>([]);
  toDoList: Observable<{ rows: Chores[] }>;

  constructor(public zone: NgZone, private toDoService: ToDoService, public toDoDialog: MatDialog) {
    this.toDoList = toDoService.getChores<{ rows: Chores[] }>();
  }

  ngOnInit() {
    this.toDoList.subscribe((chores: { rows: Chores[] }) => {
      this.dataSource.data = chores.rows;
    });
  }

  createToDo(event: Chores): void {
  }

  createToDoDialog(): void {
    const dialogRef = this.toDoDialog.open(CreateToDoForm, {
      width: '400px',
      data: { position:
          Math.max(
          ...this.dataSource.data.map(({ position }) => position || 0
      )) + 1 , name: this.name, time: this.time}
    });

    dialogRef.afterClosed().subscribe(result => {
        const data = { _id: result._id, position: result.position, name: result.name, time: result.time};
        this.dataSource.data = [
          ...this.dataSource.data, data
        ];
        this.toDoService.createToDo(data);
    });
  }

  editToDoDialog(event: Chores) {
    const dialogRef = this.toDoDialog.open(CreateToDoForm, {
      width: '400px',
      data: {
        _id: event._id,
        position: event.position,
        name: this.name,
        time: this.time
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      const data = {
        _id: result._id,
        position: event.position,
        name: result.name,
        time: result.time
      };
      const otherData = this.dataSource.data.filter(
        ({ position }: Chores) => position !== event.position
      );
      this.dataSource.data = [...otherData, data];
      this.toDoService.editToDo(data);
    });

  }

  deleteData(delPosition: Chores) {
    const data = this.dataSource.data;
    const dataItemRemoved = data.filter(({position}: Chores) => position !== delPosition.position);
    this.dataSource.data = dataItemRemoved;

    this.toDoService.deleteToDo(delPosition._id);
  }
}
