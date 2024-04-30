import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  overlayOpen = signal(false);
  RS_KEY = 'recentSearch'
  recentSearches = signal<string[]>(
    JSON.parse(window.localStorage.getItem(this.RS_KEY) || '[]')
  );
  searchTerm = signal('');

  search(searchTerm:string) {
    //Perfomm the search
    this.searchTerm.set(searchTerm);
    this.overlayOpen.set(false);
    this.addToRecentSearches(searchTerm);
  }

  addToRecentSearches(searchTerm:string) {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const searchItems = [lowerCaseTerm,...this.recentSearches().filter((s) => s !==lowerCaseTerm)]
    this.recentSearches.set(searchItems);
  }

  removeFromRecentSearches(searchTerm:string) {
    this.recentSearches.set(this.recentSearches().filter((s) => s !== searchTerm))
    if(this.recentSearches().length === 0) {
      this.overlayOpen.set(false);
    }

  }

  clearSearch() {
    this.overlayOpen.set(false);
    this.searchTerm.set('');
  }
 

  saveLocalStorage = effect(() => {
    window.localStorage.setItem(
      this.RS_KEY, 
      JSON.stringify(this.recentSearches())
    );
  })
}
