import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public breakfastItems: Array<Item>;
  public lunchItems: Array<Item>;
  public dinnerItems: Array<Item>;
  public drinkItems: Array<Item>;
  public dessertItems: Array<Item>;
  public otherItems: Array<Item>;
  public itemName: string;
  public price: number;
  public category: string;
  public description: string;
  public photoUrl: string;
  constructor(private route: Router) {
    this.breakfastItems = [];
    this.lunchItems = [];
    this.dinnerItems = [];
    this.drinkItems = [];
    this.dessertItems = [];
    this.otherItems = [];
    localStorage.clear();
    this.breakfastItems.push(new Item('Dosa', 12.25, 'Breakfast', 'dosa', '/assets/Breakfast.jpg'));
    this.lunchItems.push(new Item('Biryani', 12.25, 'Lunch', 'dosa', '/assets/Breakfast.jpg'));
    this.dinnerItems.push(new Item('Butter Chicken', 12.25, 'Dinner', 'dosa', '/assets/Breakfast.jpg'));
    this.drinkItems.push(new Item('Lassi', 12.25, 'Drinks', 'dosa', '/assets/Breakfast.jpg'));
    this.dessertItems.push(new Item('Kheer', 12.25, 'Desserts', 'dosa', '/assets/Breakfast.jpg'));
    this.otherItems.push(new Item('Avakai', 12.25, 'Other', 'dosa', '/assets/Breakfast.jpg'));
    this.breakfastItems.push(new Item('Idli', 12.25, 'Breakfast', 'dosa', '/assets/Breakfast.jpg'));
    this.lunchItems.push(new Item('Chicken Curry', 12.25, 'Lunch', 'dosa', '/assets/Breakfast.jpg'));
    this.dinnerItems.push(new Item('Chiken Tikka Masala', 12.25, 'Dinner', 'dosa', '/assets/Breakfast.jpg'));
    this.drinkItems.push(new Item('Thumbs Up', 12.25, 'Drinks', 'dosa', '/assets/Breakfast.jpg'));
    this.dessertItems.push(new Item('Ladoo', 12.25, 'Desserts', 'dosa', '/assets/Breakfast.jpg'));
    this.otherItems.push(new Item('Curd', 12.25, 'Other', 'dosa', '/assets/Breakfast.jpg'));
    this.breakfastItems.push(new Item('Upma', 12.25, 'Breakfast', 'dosa', '/assets/Breakfast.jpg'));
    this.lunchItems.push(new Item('Naan', 12.25, 'Lunch', 'dosa', '/assets/Breakfast.jpg'));
    this.dinnerItems.push(new Item('Roti', 12.25, 'Dinner', 'dosa', '/assets/Breakfast.jpg'));
    this.drinkItems.push(new Item('Sugar Cane Juice', 12.25, 'Drinks', 'dosa', '/assets/Breakfast.jpg'));
    this.dessertItems.push(new Item('Gulab Jamun', 12.25, 'Desserts', 'dosa', '/assets/Breakfast.jpg'));
    this.otherItems.push(new Item('Chutney', 12.25, 'Other', 'dosa', '/assets/Breakfast.jpg'));
    localStorage.setItem('Breakfast', JSON.stringify(this.breakfastItems));
    localStorage.setItem('Lunch', JSON.stringify(this.lunchItems));
    localStorage.setItem('Dinner', JSON.stringify(this.dinnerItems));
    localStorage.setItem('Drinks', JSON.stringify(this.drinkItems));
    localStorage.setItem('Desserts', JSON.stringify(this.dessertItems));
    localStorage.setItem('Other', JSON.stringify(this.otherItems));
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  goBack() {
    this.route.navigate(['/home'])
  }
  createItem() {
    var array: Item [] = JSON.parse(localStorage.getItem(this.category));
    var tItem = new Item(this.itemName, this.price, this.category, this.description, this.photoUrl);
    array.push(tItem);
    localStorage.setItem(this.category, JSON.stringify(array));
    this.itemName = "";
    this.price = null;
    this.category = "";
    this.description = "";
    this.photoUrl = "";
    this.route.navigate(['/item-detail', {selectedItem: tItem}]);
  }
}
export class Item {
  public name: string;
  public price: number;
  public category: string;
  public description: string;
  public photo: string;
  constructor(iname: string, iprice: number, icat: string, ides: string, iphoto: string) {
    this.name = iname;
    this.price = iprice;
    this.description = ides;
    this.photo = iphoto;
    this.category = icat;
  }
}