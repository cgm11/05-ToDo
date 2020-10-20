import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  lists: List[] = [];

  constructor() {
    this.uploadStorage();
  }

  createList( title: string ) {
    const newList = new List(title);
    this.lists.push(newList);
    this.saveStorage();

    return newList.id;
  }

  deleteList( list: List ) {
    this.lists = this.lists.filter( dataList => dataList.id !== list.id );
    this.saveStorage();
  }

  getList( id: string | number ) {
    id = Number(id);
    return this.lists.find( dataList =>  dataList.id === id );
  }

  saveStorage(){
    localStorage.setItem('data', JSON.stringify(this.lists));
  }

  uploadStorage(){
    if ( localStorage.getItem('data') ){
      this.lists = JSON.parse(localStorage.getItem('data'));
    } else {
      this.lists = [];
    }
  }
}
