import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  // Method to save data to local storage
  save(key: string, value: any): void {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  // Method to retrieve data from local storage
  get(key: string): any {
    const value = this.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Method to remove data from local storage
  remove(key: string): void {
    this.localStorage.removeItem(key);
  }

  // Method to clear all data from local storage
  clear(): void {
    this.localStorage.clear();
  }
}
