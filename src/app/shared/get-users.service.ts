import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {
  private _users$ = new BehaviorSubject<Array<User>>([]);
  
  get users$(): Observable<Array<User>> {
    return this._users$.asObservable();
  }

  public userArray: User[] = [];
  constructor(private http: HttpClient) {    
    this.http.get('assets/csv.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let users = new Array<User>();

          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            users.push(<User>{ id: parseInt(row[0], 10), name: row[1], lastName: row[2].trim() });
          }
          this._users$.next(users);
        },
        error => {
          console.log(error);
        }
      );
  }
}

export interface User {
  id: number;
  name: String;
  lastName: String;
};