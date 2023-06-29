import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ref, set } from '@angular/fire/database/firebase';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
})
export class DialogBoxComponent{
  cid:string;
  constructor(
    private db: AngularFireDatabase,
    private dataService: DataService
    ) {}

  sendData() {
    this.cid = this.dataService.customId;
    const data = {
      name: this.dataService.ename,
      age: this.dataService.eage,
      score: this.dataService.escore,
    };

    const dataRef = this.db.object(`winners/${this.cid}`);
    dataRef.set(data)
      .then(() => {
        alert('Data sent successfully');
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  }
}