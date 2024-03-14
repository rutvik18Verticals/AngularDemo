import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddEmployee_RequestPayload, AddEmployee_Response, Employee_Response, UpdateEmployee_RequestPayload } from '../../Interfaces/Employee_Models';
import { AddEditEmployeeApiService } from './add-edit-employee-api.service';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.scss'
})
export class AddEditEmployeeComponent {
  addEditEmployeeForm!: FormGroup;
  @Input() isFromUpdate: boolean = false;
  @Input() employeeId!: number;

  constructor(
    private activeModel: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private addEditEmployeeApiService: AddEditEmployeeApiService
  ) {
    this.buildForm();
  }
  ngOnInit() {
    if (this.isFromUpdate) {
      this.getEmployeeDetailsById(this.employeeId);
    }
  }

  onClose() {
    this.activeModel.close(true);
  }

  /**
   * This function will be called to build reactive form to use in the HTML
   */
  private buildForm() {
    this.addEditEmployeeForm = this.fb.group({
      Name: ['', Validators.required],
      Age: [0],
      Address: [''],
      Department: [0],
      Designation: [''],
    });
  }

  /**
   * This function will be called on Add button click
   */
  public onAddButtonClick() {
    if (this.isFromUpdate) {
      this.onUpdateButtonClick();
    } else {
      if (this.addEditEmployeeForm.valid) {
        let formValues = this.addEditEmployeeForm.value;
        let requestPayload: AddEmployee_RequestPayload = {
          Name: formValues.Name,
          Address: formValues.Address,
          Age: formValues.Age,
          Designation: formValues.Designation,
          LoginUserId: 0,
        };
        this.addEditEmployeeApiService
          .addEmployee(requestPayload)
          .subscribe((res: AddEmployee_Response) => {
            if (res.isSuccess) {
              this.toastr.success(res.message);
              this.activeModel.close();
            } else if (res.isInformation) {
              this.toastr.info(res.message);
            } else if (res.isWarning) {
              this.toastr.warning(res.message);
            } else if (res.isError) {
              this.toastr.error(res.message);
            } else {
              this.activeModel.close();
            }
          });
      } else {
        this.toastr.error('Enter your name');
      }
    }
  }

  /**
   * This function will be called to get employee details by id
   * @param id
   */
  public getEmployeeDetailsById(id: number) {
    this.addEditEmployeeApiService
      .getEmployeeById(id)
      .subscribe((res: Employee_Response) => {
        if (res.isSuccess) {
          this.addEditEmployeeForm.patchValue({
            Name: res.name,
            Age: res.age,
            Address: res.address,
            Designation: res.designation,
          });
        } else if (res.isInformation) {
          this.toastr.info(res.message);
        } else if (res.isWarning) {
          this.toastr.warning(res.message);
        } else if (res.isError) {
          this.toastr.error(res.message);
        }
      });
  }

  /**
   * This funtion will be called on update button click
   */
  public onUpdateButtonClick() {
    if (this.addEditEmployeeForm.valid) {
      let formValues = this.addEditEmployeeForm.value;
      let requestPayload: UpdateEmployee_RequestPayload = {
        Id: this.employeeId,
        Name: formValues.Name,
        Address: formValues.Address,
        Age: formValues.Age,
        Designation: formValues.Designation,
        LoginUserId: 0,
      };
      this.addEditEmployeeApiService
        .updateEmployee(requestPayload)
        .subscribe((res: AddEmployee_Response) => {
          if (res.isSuccess) {
            this.toastr.success(res.message);
            this.activeModel.close();
          } else if (res.isInformation) {
            this.toastr.info(res.message);
          } else if (res.isWarning) {
            this.toastr.warning(res.message);
          } else if (res.isError) {
            this.toastr.error(res.message);
          } else {
            this.activeModel.close();
          }
        });
    } else {
      this.toastr.error('Enter your name');
    }
  }
}
