import { Component, OnInit } from '@angular/core';
import { GetUsersService } from '../shared/get-users.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(public getUsersService: GetUsersService) { }

  ngOnInit(): void {}

}
