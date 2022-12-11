import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { RouterModule, Routes } from '@angular/router';
import { GetUsersService } from '../shared/get-users.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent
  }
];

@NgModule({
  declarations: [
    MembersComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatTableModule
  ],
  providers: [
    GetUsersService,
    HttpClient
  ]
})
export class MembersModule { }
