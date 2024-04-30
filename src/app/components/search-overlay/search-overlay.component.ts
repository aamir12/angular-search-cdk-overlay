import { Component, computed, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { SearchBarService } from '../../services/search-bar.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-search-overlay',
  standalone: true,
  imports: [
    MatDivider,
    MatListModule,
    MatIcon,
    MatIconButton,
    A11yModule
  ],
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss'
})
export class SearchOverlayComponent {
  searchBarService = inject(SearchBarService);
  recentSearches = computed(() => {
    return this.searchBarService.recentSearches().slice(0,5);
  }) 

  onDeleteRecentSearch(searchTerm:string) {
    this.searchBarService.removeFromRecentSearches(searchTerm);
  } 

  performSearch(search:string) {
    this.searchBarService.search(search);
  }
}
