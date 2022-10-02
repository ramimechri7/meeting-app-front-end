import { AdminComponent } from './admin/admin.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { DetailsComponent } from './details/details.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IsAtuhenticatedGuard } from './is-atuhenticated.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '',
   component: LoginComponent,
  },
  {path: 'admin',
   component: AdminComponent,
  },
  {path:'edit-meeting',
   component : EditMeetingComponent,
   canActivate : [IsAtuhenticatedGuard],
  },
  {path: 'details',
   component: DetailsComponent,
   canActivate : [IsAtuhenticatedGuard],
  },

  {path:'home',
   component : HomeComponent,
   canActivate : [IsAtuhenticatedGuard],
  },
  {path: 'add-meeting',
   component : AddMeetingComponent,
   canActivate : [IsAtuhenticatedGuard]
},
  {path:'register', component : RegisterComponent},
  {path:'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
