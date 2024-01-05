import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ActivationComponent } from './pages/activation/activation.component'
import { authInterceptorProviders } from './services/auth.interceptor';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AddTicketComponent } from './pages/add-ticket/add-ticket.component';
import { HomeComponent } from './pages/home/home.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { UserDashboardMainComponent } from './pages/user-dashboard-main/user-dashboard-main.component';
import { AssignRiskComponent } from './pages/assign-risk/assign-risk.component';
import { ChatComponent } from './pages/chat/chat.component';
import { UserDoashboardInspectionComponent } from './pages/user-doashboard-inspection/user-doashboard-inspection.component';
import { StaticticsComponent } from './pages/statictics/statictics.component';
import { ConfigurationManagementComponent } from './pages/configuration-management/configuration-management.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ActivationComponent,
    UserDashboardComponent,
    AddTicketComponent,
    HomeComponent,
    PolicyComponent,
    UserDashboardMainComponent,
    AssignRiskComponent,
    ChatComponent,
    UserDoashboardInspectionComponent,
    StaticticsComponent,
    ConfigurationManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
