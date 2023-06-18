import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { ResourceListComponent } from './resource/resource-list/resource-list.component';
import { AuthComponent } from './auth/auth/auth.component';
import { ResourcePageComponent } from './resource/resource-page/resource-page.component';
import { ResourceDetailsComponent } from './resource/resource-details/resource-details.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  {
    path: 'resources',
    component: ResourcePageComponent,
    children: [
      { path: '', component: ResourceListComponent },
      { path: ':id', component: ResourceDetailsComponent },
      { path: 'add', component: ResourceDetailsComponent },
    ],
  },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
