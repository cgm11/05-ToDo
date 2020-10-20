import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( private deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController ) {
  }

  async addList() {
    const alert = await this.alertCtrl.create({
      header: 'New List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Name of the list'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        },
        {
          text: 'Create',
          handler: ( data ) => {
            if ( data.title.length === 0 ) {
              return;
            }
            const listId = this.deseosService.createList(data.title);
            this.router.navigateByUrl(`tabs/tab1/add/${listId}`);
          }
        }
      ]
    });
    alert.present();
  }

}
