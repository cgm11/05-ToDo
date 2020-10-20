import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  @Input() finished = true;
  @ViewChild( IonList ) list: IonList;

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController ) {
  }

  selectedList(list: List) {
    if ( this.finished ) {
      this.router.navigateByUrl(`tabs/tab2/add/${list.id}`);
    }else {
      this.router.navigateByUrl(`tabs/tab1/add/${list.id}`);
    }
  }

  deleteList( list: List ) {
    this.deseosService.deleteList( list );
  }

  async editList( list: List ) {
    const alert = await this.alertCtrl.create({
      header: 'Edit List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title,
          placeholder: 'Name of the list'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Edit',
          handler: ( data ) => {
            if ( data.title.length === 0 ) {
              return;
            }
            list.title = data.title;
            this.deseosService.saveStorage();
            this.list.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }

  ngOnInit() {}
}
