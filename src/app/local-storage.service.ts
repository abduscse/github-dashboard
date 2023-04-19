import { Injectable } from '@angular/core';
import { isEmpty } from './shared/utils';
export interface SearchObject {
  id?: number;
  keywords: string;
  timestamp?: Date;
  userCount?: number;
  status: string;
}
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
    // to maintain search history on local storage
    const search_history = this.get('search_history');
    if (isEmpty(search_history)) {
      this.set('search_history', []);
    }
  }
  // get value from local storage
  get(key: any): any {
    const stringKey = typeof key === 'string' ? key : JSON.stringify(key);
    const value = localStorage.getItem(stringKey);
    if (value === undefined || value === null) {
      return null;
    } else {
      return JSON.parse(value);
    }
  }
  // set key value pair to local storage
  set(key: any, value: any) {
    const stringKey = typeof key === 'string' ? key : JSON.stringify(key);
    if (value !== undefined && value !== null) {
      return localStorage.setItem(stringKey, JSON.stringify(value));
    }
  }
  // clear one item from local storage
  clearItem(key: any) {
    const stringKey = typeof key === 'string' ? key : JSON.stringify(key);
    localStorage.removeItem(stringKey);
  }
  // clear all local storage
  clear() {
    localStorage.clear();
  }
  // add search history item to local storage
  addSearch(obj: any) {
    const search_history = this.get('search_history');
    obj.id = Math.ceil(Math.random() * 100000);
    obj.timestamp = new Date();
    search_history.unshift(obj);
    this.set('search_history', search_history);
  }
  // delete search history from local storage
  clearSearchItem(id: number) {
    const search_history = this.get('search_history').filter((item: any) => item.id !== id);
    this.set('search_history', search_history);
  }
}
