import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  winnersIndex=1;
  toppersIndex=1;
  ename: string;
  edbIndex: string;
  eage: string;
  escore: string;
  customId:string;
  tableName: string;

  setData(index:string,dbIndex:string,named:string,age:string,score:string) {
    this.customId=index;
    this.edbIndex=dbIndex;
    this.ename=named;
    this.eage=age;
    this.escore=score;
  }
  setTableName(tableName:string){
    this.tableName=tableName;
  }
}
