import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AddEmployee_RequestPayload, AddEmployee_Response, Employee_Response, UpdateEmployee_RequestPayload } from '../../Interfaces/Employee_Models';

@Injectable({
  providedIn: 'root'
})
export class AddEditEmployeeApiService {
  constructor(private http:HttpClient) { 

  }
  
  /**
   * This API will be called to add Employee 
   */
  public addEmployee(requestPayload:AddEmployee_RequestPayload):Observable<AddEmployee_Response>{
    return this.http.post<AddEmployee_Response>(environment.apiUrl + '/api/Employee/AddEmployee',requestPayload);
  }
  public updateEmployee(requestPayload:UpdateEmployee_RequestPayload):Observable<AddEmployee_Response>{
    return this.http.post<AddEmployee_Response>(environment.apiUrl + '/api/Employee/UpdateEmployee',requestPayload);
  }
  
    /**
   * This API will be called to get Employee by perticuler Id 
   */
    public getEmployeeById(id:number):Observable<Employee_Response>{
      return this.http.get<Employee_Response>(environment.apiUrl + `/api/Employee/${id}`);
    }
}
