import { ICommonMessage } from './shared_Models';

export interface IEmployeeList_Response extends ICommonMessage {
  employees: IEmployeeList[];
}
export interface IEmployeeList {
  id: number;
  name: string;
  age: number;
  address: string;
  designation: string;
  createdDate: string;
  updatedDate: string;
  createdBy: number;
  updatedy: number;
}

export interface AddEmployee_RequestPayload {
  Name: string;
  Age: number;
  Address: string;
  Designation: string;
  LoginUserId: number;
}

export interface AddEmployee_Response extends ICommonMessage {
  id: number;
  name: string;
  age: number;
  address: string;
  designation: string;
  createdDate: string;
  updatedDate: string;
  createdBy: number;
  updatedy: number;
}
export interface Employee_Response extends ICommonMessage {
  id: number;
  name: string;
  age: number;
  address: string;
  designation: string;
  createdDate: string;
  updatedDate: string;
  createdBy: number;
  updatedy: number;
}

export interface UpdateEmployee_RequestPayload{
    Id:number,
    Name: string;
    Age: number;
    Address: string;
    Designation: string;
    LoginUserId: number;
}

export interface IDeleteEmployee_Response extends ICommonMessage{
  id:number
}