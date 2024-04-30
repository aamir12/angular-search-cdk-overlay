import { AfterViewInit, Component, HostBinding, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, computed, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import { SearchBarService } from '../../services/search-bar.service';

import { NgClass } from '@angular/common';
import { A11yModule, ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { MatDivider } from '@angular/material/divider';
import { MatActionList, MatListItem, MatListModule } from '@angular/material/list';
import { ListItemComponent } from './list-item/list-item.component';
import { ENTER } from '@angular/cdk/keycodes';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    OverlayModule,
    // SearchOverlayComponent,
    NgClass,
    A11yModule,
    MatDivider,
    MatListModule,
    ListItemComponent
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit, AfterViewInit,Highlightable, OnDestroy{
  @ViewChild(CdkConnectedOverlay,{static:true}) private connectedOverlay!: CdkConnectedOverlay;

  @ViewChildren(ListItemComponent) matlistitems! :QueryList<ListItemComponent>

  private keyManager!: ActiveDescendantKeyManager<ListItemComponent>;
  searchBarService = inject(SearchBarService); 
  overlayOpen = this.searchBarService.overlayOpen;
  searchTerm = this.searchBarService.searchTerm;
  private _isActive = false;
  searchFn: (search:string) => void = () => {};
  onDeleteRecentSearchFn : (searchTerm:string) => void = () => {};

  private readonly destroy: Subject<void> = new Subject<void>();
  
  constructor() {}
  ngOnInit(): void {
    this.searchFn = this.onSearch.bind(this);
    this.onDeleteRecentSearchFn = this.onDeleteRecentSearch.bind(this);

    this.connectedOverlay.overlayKeydown
    .pipe(takeUntil(this.destroy.asObservable()))
    .subscribe((event:KeyboardEvent) => {
      this.keyManager.onKeydown(event);
      if(this.keyManager.activeItem?.item) {
        this.searchTerm.set(this.keyManager.activeItem?.item);
      }
        
    })
  }

  ngAfterViewInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.matlistitems).withWrap();
  }

  onInputFocus() {
    if(this.searchBarService.recentSearches().length === 0) {
      this.overlayOpen.set(false);
      return;
    }
    this.overlayOpen.set(true);
  }
  onSearch(searchTerm:string) {
    const search = searchTerm.trim();
    if(!search) {
      return;
    }

    this.searchBarService.search(search);
  }

  onClear() {
    this.searchBarService.clearSearch();
  }

  recentSearches = computed(() => {
    return this.searchBarService.recentSearches().slice(0,5);
  }) 

  onDeleteRecentSearch(searchTerm:string) {
    this.searchBarService.removeFromRecentSearches(searchTerm);
  } 

  performSearch(search:string) {
    this.searchBarService.search(search);
  }

  @HostBinding('class.active') get isActive() {
    return this._isActive;
  };

  setActiveStyles() {
    this._isActive = true;
  };

  setInactiveStyles() {
    this._isActive = false;
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
