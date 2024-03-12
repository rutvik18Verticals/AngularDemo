import { Component, OnInit, Signal, signal } from '@angular/core';
import { EmployeeListService } from './employee-list.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IEmployeeList } from '../../Interfaces/Employee_Models';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  public employeeList = signal<IEmployeeList[]>([]);
  public orderBy= signal<string>('');
  public sortDir: string = 'asc';
  public searchKeyword: string = '';
  constructor(private employeeListApiService:EmployeeListService,
      private toastr: ToastrService,
      private ngbModal: NgbModal
    ) {
      // this.getEmployeeList();
    }

    ngOnInit(): void {
  }

}
