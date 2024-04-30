import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import { SearchBarService } from '../../services/search-bar.service';
import { SearchOverlayComponent } from '../search-overlay/search-overlay.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    OverlayModule,
    SearchOverlayComponent,
    NgClass
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit{
  @ViewChild(CdkConnectedOverlay,{static:true}) private connectedOverlay!: CdkConnectedOverlay;
  searchBarService = inject(SearchBarService); 
  overlayOpen = this.searchBarService.overlayOpen;
  searchTerm = this.searchBarService.searchTerm;
  ngOnInit(): void {
    // this.connectedOverlay.overlayKeydown.subscribe((res:KeyboardEvent) => {
    //   console.log("connectedoverlay",res);
    // })
  }

  onInputFocus() {
    if(this.searchBarService.recentSearches().length === 0) {
      this.overlayOpen.set(false);
      return;
    }
    this.overlayOpen.set(true);
  }
  search(searchTerm:string) {
    console.log("Hit Enter")
    const search = searchTerm.trim();
    if(!search) {
      return;
    }

    this.searchBarService.search(search);
  }

  onClear() {
    this.searchBarService.clearSearch();
  }
}
