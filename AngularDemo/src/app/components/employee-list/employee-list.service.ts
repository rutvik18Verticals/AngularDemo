import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISortParams } from '../../Interfaces/shared_Models';
import { Observable } from 'rxjs';
import { IDeleteEmployee_Response, IEmployeeList_Response } from '../../Interfaces/Employee_Models';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeListService {

  constructor(private http:HttpClient) { }
   /**
   * This API will be called to get Employee list from the backend
   * @returns value of type IEmployeeList_Response
   */
   public GetEmployeeList(request:ISortParams):Observable<IEmployeeList_Response>{
    return this.http.post<IEmployeeList_Response>(environment.apiUrl + '/api/Employee/GetEmployeeList',request);
  }

  public DeleteEmployee(id:number):Observable<IDeleteEmployee_Response>{
    return this.http.delete<IDeleteEmployee_Response>(environment.apiUrl + `/api/Employee/DeleteEmployee/${id}`);
  }
}
