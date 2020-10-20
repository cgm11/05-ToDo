import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { DeseosService } from '../../services/deseos.service';
import { ListItem } from '../../models/list-item';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  list: List;
  itemName = '';

  constructor(
    private deseosService: DeseosService,
    private router: ActivatedRoute
  ) {
    const idList = this.router.snapshot.paramMap.get('idlist');

    this.list = this.deseosService.getList(idList);
  }

  addItem() {
    if (this.itemName.length === 0) {
      return;
    }
    const newItem = new ListItem(this.itemName);
    this.list.items.push(newItem);
    this.itemName = '';
    this.deseosService.saveStorage();
  }

  changeCheck(item: ListItem) {
    const pending = this.list.items.filter((dataItem) => !dataItem.completed)
      .length;

    if (pending === 0) {
      this.list.finished = new Date();
      this.list.completed = true;
    } else {
      this.list.finished = null;
      this.list.completed = false;
    }

    this.deseosService.saveStorage();
  }

  delete(i: number) {
    this.list.items.splice(i, 1);
    this.deseosService.saveStorage();
  }

  ngOnInit() {}
}
