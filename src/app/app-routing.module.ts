import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { ActivationComponent } from './pages/activation/activation.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { userGuard } from './services/user.guard';
import { HomeComponent } from './pages/home/home.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { loginPageGuard } from './services/login-page.guard';
import { AddTicketComponent } from './pages/add-ticket/add-ticket.component';
import { UserDashboardMainComponent } from './pages/user-dashboard-main/user-dashboard-main.component';
import { AssignRiskComponent } from './pages/assign-risk/assign-risk.component';
import { ChatComponent } from './pages/chat/chat.component';
import { UserDoashboardInspectionComponent } from './pages/user-doashboard-inspection/user-doashboard-inspection.component';
import { adminGuard } from './services/admin.guard';
import { StaticticsComponent } from './pages/statictics/statictics.component';
import { ConfigurationManagementComponent } from './pages/configuration-management/configuration-management.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'activation',
    component: ActivationComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [loginPageGuard]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [userGuard],
    children: [
      {
        path: 'add-ticket',
        component: AddTicketComponent
      },
      {
        path: 'main',
        component: UserDashboardMainComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'statistics',
        component: StaticticsComponent
      }
    ]
  },
  {
    path: 'policy',
    component: PolicyComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin-dashboard',
    component: UserDashboardComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'main',
        component: UserDoashboardInspectionComponent
      },
      {
        path: 'ticket/:ticketId',
        component: AssignRiskComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'add-ticket',
        component: AddTicketComponent
      },
      {
        path: 'statistics',
        component: StaticticsComponent
      }
    ]
  },
  {
    path: 'system-admin-dashboard',
    component: UserDashboardComponent,
    children: [
      {
        path: 'configuration-management',
        component: ConfigurationManagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
