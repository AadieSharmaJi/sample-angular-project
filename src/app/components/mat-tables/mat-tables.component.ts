import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import {
  Database,
  set,
  ref,
  update,
  onValue,
  getDatabase,
} from '@angular/fire/database';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DeleteBoxComponent } from '../delete-box/delete-box.component';
import { DataService } from 'src/app/services/data-service.service';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';

@Component({
  selector: 'app-mat-tables',
  templateUrl: './mat-tables.component.html',
  styleUrls: ['./mat-tables.component.css'],
})
export class MatTablesComponent implements OnInit {
  @ViewChild(MatSort) sort:MatSort;
  @Input('tabname') tableName: string;
  buttonVal:string;
  filterAge:number;
  filterScore:number;
  static fetchData: any;
  constructor(
    private database: AngularFireDatabase,
    public dialog: MatDialog,
    private dataService: DataService
  ) {}
  dataSource: MatTableDataSource<any>;
  apiResponse:any=[];
  userDataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'age', 'score', 'option'];

  ngOnInit() {
    this.fetchData(this.tableName);
    this.nameButton();
  }

  public fetchData(tableName: string) {
    this.database
      .list(tableName)
      .valueChanges()
      .subscribe((data: any[]) => {
        this.apiResponse=data;
        this.dataSource = new MatTableDataSource(this.onloading(data));
        this.dataSource.sort = this.sort;
      });
  }
  openDialog(indexed:string,dbIndexed:string,named: string, age: string, score: string) {
    if (this.tableName == 'users') {
      this.sendDataToDialog(indexed,dbIndexed,named,age,score);
      this.dialog.open(DialogBoxComponent, {
        width: '350px',
      });
    } else {
      this.dataService.setTableName(this.tableName);
      this.sendDataToDialog(indexed,dbIndexed,named,age,score);
      this.dialog.open(DeleteBoxComponent, {
        width: '350px',
      });
    }
  }
  onloading(data:any){
    let filteredData = _.filter(data,(item)=>{
      this.filterAge = +item.age;
      return this.filterAge <= 21 ;
    })
    return filteredData
  }
  sendDataToDialog(eindex:string,
    eDbIndex:string,
    ename: string,
    eage: string,
    escore: string) {
    this.dataService.setData(eindex,eDbIndex,ename,eage,escore);
  }
  nameButton(){
    if(this.tableName == 'users'){
      this.buttonVal ='Add to Winners';
    }
    else{
      this.buttonVal ='Remove from Database';
    }
  }
  
}
