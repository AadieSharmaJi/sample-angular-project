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
  scored:number;
  cid=+this.dataService.customId;
  constructor(
    private db: AngularFireDatabase,
    private dataService: DataService
    ) {}

  sendData() {
    const data = {
      dbId: +this.dataService.customId,
      name: this.dataService.ename,
      age: this.dataService.eage,
      score: this.dataService.escore,
    };
    
    this.scored = +this.dataService.escore;

    const dataRef = this.db.object(`winners/${this.dataService.customId}`);
    dataRef.set(data)
      .then(() => {
        alert('Added to Winners successfully');
        // this.dataService.winnersIndex++;
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
      if(this.scored >90){
      const dataRef2 = this.db.object(`toppers/${this.dataService.customId}`);
      dataRef2.set(data)
        .then(() => {
          alert('Added to Toppers successfully');
          // this.dataService.toppersIndex++;
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });}
  }
}