import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  members: IUser[] = [];

  lowValue: number = 0;
  highValue: number = 20;

  constructor(public getUsersService: GetUsersService) { }

  subscription$!: Subscription;

  displayedColumns: string[] = [
    'policyID',
    'statecode',
    'county',
    'eq_site_limit',
    'hu_site_limit',
    'fl_site_limit',
    'fr_site_limit',
    'tiv_2011',
    'tiv_2012',
    'eq_site_deductible',
    'hu_site_deductible',
    'fl_site_deductible',
    'fr_site_deductible',
    'point_latitude',
    'point_longitude',
    'line',
    'construction',
    'point_granularity',
    'policyID_statecode'
  ];

  ngOnInit(): void {
    this.subscription$ = this.getUsersService.users$.subscribe(res => {
      this.members = res;
      this.dataSource = this.members.slice(this.lowValue, this.highValue);
    })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;

    this.dataSource = this.members.slice(this.lowValue, this.highValue);
    return event;
  }
}
