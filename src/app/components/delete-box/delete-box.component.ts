import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data-service.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-delete-box',
  templateUrl: './delete-box.component.html',
  styleUrls: ['./delete-box.component.css'],
})
export class DeleteBoxComponent {
  constructor(
    private db: AngularFireDatabase,
    private dataService: DataService
  ) {}
  cid=+this.dataService.edbIndex;
  tablename=this.dataService.tableName;

  deleteData() {
    const dataRef = this.db.object(`${this.tablename}/${this.cid}`);
    dataRef.remove().then(() => {
      alert('Deleted successfully');
    })
    .catch((error) => {
      console.error('Error sending data:', error);
    });;
  }
}
