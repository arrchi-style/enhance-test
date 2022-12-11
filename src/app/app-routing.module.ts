import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'members',
    pathMatch: 'full'
  },
  {
    path: 'members',    
    loadChildren: async () => (await import('./members/members.module')).MembersModule,    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
