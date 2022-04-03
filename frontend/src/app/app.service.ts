import {Injectable} from "@angular/core";
import {catchError, Observable, of} from "rxjs";
import {Chores} from "./app.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const rooturl = 'http://localhost'

@Injectable({
  providedIn: 'root',
})
export class ToDoService {

  constructor(private httpClient: HttpClient) {

  }


  getChores<T>() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.get<T>(`${rooturl}/api/todo`,
      httpOptions)
      .pipe(
        chores => chores,
        catchError((err) => {
          return of({ rows: []});
        })
      )
  }

  createToDo(data: Chores) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const req = this.httpClient.post(`${rooturl}/api/todo`, { ...data }, httpOptions );
    req.subscribe();
  }

  editToDo(data: Chores) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const req = this.httpClient.put(`${rooturl}/api/todo/${data._id}`, { ...data }, httpOptions );
    req.subscribe();

  }

  deleteToDo(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const req = this.httpClient.delete(`${rooturl}/api/todo/${data}`, httpOptions );
    req.subscribe();

  }
}
