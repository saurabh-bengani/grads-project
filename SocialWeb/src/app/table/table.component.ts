import {Component, OnInit, Input} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  employeeCredentials: any = [];

  constructor(private employeeService: EmployeeService,
    private router: Router) {}

  ngOnInit() {
    this.getCredentials();
  }

  getCredentials() {
    this.employeeService.loadEmployee()
      .subscribe((credentials) => {
        this.employeeCredentials = credentials;
      });

  }

}