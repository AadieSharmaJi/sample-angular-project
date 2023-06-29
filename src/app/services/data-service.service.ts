import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  ename: string;
  eage: string;
  escore: string;
  customId:string;

  setData(index:string,named:string,age:string,score:string) {
    this.customId=index;
    this.ename=named;
    this.eage=age;
    this.escore=score;
  }
}
