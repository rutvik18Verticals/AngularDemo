import { Component, OnInit, Signal, signal } from '@angular/core';
import { EmployeeListService } from './employee-list.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeleteEmployee_Response, IEmployeeList, IEmployeeList_Response } from '../../Interfaces/Employee_Models';
import { ISortParams } from '../../Interfaces/shared_Models';
import { debounceTime, map, takeUntil } from 'rxjs';
import { NgClass } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgClass,FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  public employeeList = signal<IEmployeeList[]>([]);
  public orderBy= signal<string>('Name');
  public sortDir: string = 'asc';
  public searchKeyword: string = '';
  constructor(private employeeListApiService:EmployeeListService,
      private toastr: ToastrService,
      private ngbModal: NgbModal
    ) {
    }

    ngOnInit(): void {
      this.getEmployeeList();
  }
  /**
   * This function will be called to get all the employe list to show in the table
   */
  private getEmployeeList() {
    let requestPayload: ISortParams = {
      OrderBy: this.orderBy(),
      SearchKeyword: this.searchKeyword,
      SortDir: this.sortDir,
    };
    this.employeeListApiService
      .GetEmployeeList(requestPayload)
      .pipe(
        debounceTime(300),
        map((res: IEmployeeList_Response) => {
          res.employees?.forEach((emp) => {
            emp.createdDate = new Date(emp.createdDate).toLocaleString();
            if (emp.updatedDate) {
              emp.updatedDate = new Date(emp.updatedDate).toLocaleString();
            }
          });
          return res;
        })
      )
      .subscribe((res: IEmployeeList_Response) => {
        this.employeeList.set(res.employees)
        if (res.isSuccess) {
        } else if (res.isError) {
          this.toastr.error(res.message);
        }
        //  else if (res.isInformation) {
        //   this.toastr.info(res.message);
        // }
      });
  }

  public onSorting(orderBy: string) {
    if (this.orderBy() == orderBy && this.sortDir == 'asc') {
      this.sortDir = 'desc';
    } else {
      this.sortDir = 'asc';
    }
    this.orderBy.set(orderBy);
    this.getEmployeeList();
  }

    /**
   * This function will be called on search icon click
   */
    public onSearchClick(){
      if (this.searchKeyword) {
        debounceTime(1000)
        this.getEmployeeList();
      }
    }

      /**
   * This function will be called to delete employee
   */
  public onDeleteButtonClick(id: number) {
    if (
      confirm(
        'This action can not be undone. are you sure you want to delete this record?'
      )
    ) {
      this.employeeListApiService
        .DeleteEmployee(id)
        .subscribe((res: IDeleteEmployee_Response) => {
          if (res.isSuccess) {
            this.toastr.success(res.message);
            this.getEmployeeList();
          } else if (res.isInformation) {
            this.toastr.info(res.message);
          } else if (res.isError) {
            this.toastr.error(res.message);
          } else if (res.isWarning) {
            this.toastr.warning(res.message);
          }
        });
    }
  }


    /**
   * This function will be called upon add employee button clcik
   */
    public onAddEmployeeClick() {
      let AddEditModel = this.ngbModal.open(AddEditEmployeeComponent);
      AddEditModel.result.then((res) => {
        this.getEmployeeList();
      });
    }

      /**
   * This function will be called to open AddEditEmployeeComponent in order to update record
   */
  public onUpdateRecord(id: number) {
    let AddEditModel = this.ngbModal.open(AddEditEmployeeComponent);
    AddEditModel.componentInstance.isFromUpdate = true;
    AddEditModel.componentInstance.employeeId = id;

    AddEditModel.result.then((res) => {
      this.getEmployeeList();
    });
  }
}
