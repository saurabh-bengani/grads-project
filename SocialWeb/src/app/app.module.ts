import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import 'hammerjs';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {LoginComponent} from './login/login.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './register/register.component';
import {EmployeeService} from './employee.service';
import {PendingApprovalComponent} from './pending-approval/pending-approval.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {TableComponent} from './table/table.component'
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';

import {ProfileInfoComponent} from './profile-info/profile-info.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'profile-info', component: ProfileInfoComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'admin/profile',
    
    children: [
      {
        path:'',
        component: ProfileComponent,
      },

      {
        path: 'pendingApproval',
        children:[
          {
            path:'',
            component: PendingApprovalComponent,
          },
          {
            path: 'profile-info',
            component: ProfileInfoComponent,
          },
        ]
        
      },
      {
        path: 'table',
        
        children:[
          {
            path:'',
            component: TableComponent,
          },
          {
            path: 'profile-info',
            component: ProfileInfoComponent,
          },
        ]
      },
      
    ]
  },
  { path: 'employee/profile',
    
    children: [
      {
        path:'',
        component: ProfileComponent,
      },
      {
        path: 'profile-info',
        
        children:[
          {
            path:'',
            component: ProfileInfoComponent,
          },
          {
            path: 'register', component: RegisterComponent
          }
        ]
        
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'reportees',
        children:[
          {
            path:'',
            component: TableComponent,
          },
          {
            path: 'profile-info',
            component: ProfileInfoComponent
          },
        ]
      },
      
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    TableComponent,
    PendingApprovalComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    ProfileInfoComponent,
    FileUploadComponent,
    EditprofileComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatRadioModule,
    MatDatepickerModule,
    HttpClientModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
