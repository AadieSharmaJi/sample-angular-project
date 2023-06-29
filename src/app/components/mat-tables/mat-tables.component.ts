import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, inject } from '@angular/core';
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

@Component({
  selector: 'app-mat-tables',
  templateUrl: './mat-tables.component.html',
  styleUrls: ['./mat-tables.component.css'],
})
export class MatTablesComponent implements OnInit {
  @Input('tabname') tableName: string;
  static fetchData: any;
  constructor(
    private database: AngularFireDatabase,
    public dialog: MatDialog,
    private dataService: DataService
  ) {}
  dataSource: MatTableDataSource<any>;
  userDataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'age', 'score', 'option'];

  ngOnInit() {
    this.fetchData(this.tableName);
  }

  public fetchData(tableName: string) {
    this.database
      .list(tableName)
      .valueChanges()
      .subscribe((data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }
  openDialog(indexed:string,named: string, age: string, score: string) {
    if (this.tableName == 'users') {
      this.sendDataToDialog(indexed,named,age,score);
      this.dialog.open(DialogBoxComponent, {
        width: '350px',
      });
    } else {
      this.dialog.open(DeleteBoxComponent, {
        width: '350px',
      });
    }
  }
  sendDataToDialog(eindex:string,
    ename: string,
    eage: string,
    escore: string) {
    this.dataService.setData(eindex,ename,eage,escore);
  }
}
