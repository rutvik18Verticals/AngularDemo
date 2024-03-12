export interface ICommonMessage{
message:string
isError:boolean
isSuccess:boolean
isWarning:boolean
isInformation:boolean
}

export interface ISortParams{
 OrderBy:string, 
 SortDir:string 
 SearchKeyword :string
}