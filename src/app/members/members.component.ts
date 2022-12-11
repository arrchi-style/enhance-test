import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { GetUsersService } from '../shared/get-users.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {
  dataSource: IUser[] = [];
  membersCount: number = 0;

  constructor(public getUsersService: GetUsersService) { }

  subscription$!: Subscription; 

  ngOnInit(): void {
    this.subscription$ = this.getUsersService.users$.subscribe(res => {
      this.dataSource = res.splice(1, 100);
      this.membersCount = res.length;
    })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  displayedColumns: string[] = [
    'policyID', 
    'statecode', 
    'county',
    'statecode/county' 
    // 'eq_site_limit', 
    // 'hu_site_limit',
    // 'fl_site_limit',
    // 'fr_site_limit',
    // 'tiv_2011',
    // 'tiv_2012',
    // 'eq_site_deductible',
    // 'hu_site_deductible',
    // 'fl_site_deductible',
    // 'fr_site_deductible',
    // 'point_latitude',
    // 'point_longitude',
    // 'line',
    // 'construction',
    // 'point_granularity'
  ];
}
