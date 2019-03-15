import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';

@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http,
              private dishservice: DishProvider,
              private storage: Storage,
              private localNotifications: LocalNotifications) {
    storage.get('favorites').then(favorites => {
      this.favorites = favorites || [];
    });
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);

    this.saveFavorites();

    // Schedule a single notification
    this.localNotifications.schedule({
      id: id,
      text: 'Dish ' + id + ' added as a favorite successfully'
    });

    return true;
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      this.saveFavorites();
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  saveFavorites() {
    this.storage.set('favorites', this.favorites);
  }
}
