import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { orders } from '../orders/orders.page';
import { Item } from '../list/list.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userID: string;
  constructor(private route: Router) {
    this.userID = firebase.auth().currentUser.uid;
    firebase.database().ref('Orders/'+this.userID).push(new orders());
  }
  menuBreakfast() {
    this.route.navigate(['/menu', {menuType: 'Breakfast'}]);
  }
  menuLunch() {
    this.route.navigate(['/menu', {menuType: 'Lunch'}]);
  }
  menuDinner() {
    this.route.navigate(['/menu', {menuType: 'Dinner'}]);
  }
  menuDrinks() {
    this.route.navigate(['/menu', {menuType: 'Drinks'}]);
  }
  menuDesserts() {
    this.route.navigate(['/menu', {menuType: 'Desserts'}]);
  }
  menuOther() {
    this.route.navigate(['/menu', {menuType: 'Other'}]);
  }
  addItem() {
    this.route.navigate(['/list']);
  }
}
