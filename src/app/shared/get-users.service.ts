import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Papa } from 'ngx-papaparse';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {
  private _users$ = new BehaviorSubject<Array<IUser>>([]);

  get users$(): Observable<Array<IUser>> {
    return this._users$.asObservable();
  }

  public userArray: IUser[] = [];
  constructor(private http: HttpClient, private papa: Papa) {
    this.http.get('assets/sample.csv', { responseType: 'text' })
      .subscribe(
        data => {
          this.papa.parse(data, {
            complete: (result) => {
              const mappedUsers: IUser[] = result.data.map((item: string) => {
                return {
                  policyID: item[0],
                  statecode: item[1],
                  county: item[2],
                  eq_site_limit: item[3],
                  hu_site_limit: item[4],
                  fl_site_limit: item[5],
                  fr_site_limit: item[6],
                  tiv_2011: item[7],
                  tiv_2012: item[8],
                  eq_site_deductible: item[9],
                  hu_site_deductible: item[10],
                  fl_site_deductible: item[11],
                  fr_site_deductible: item[12],
                  point_latitude: item[13],
                  point_longitude: item[14],
                  line: item[15],
                  construction: item[16],
                  point_granularity: item[17],
                  policyID_statecode: `${item[1]}/${item[2]}`
                }
              });

              mappedUsers.shift();

              this._users$.next(mappedUsers);
            }
          });          
        },
        error => {
          console.error(error);
        }
      );
  }
}