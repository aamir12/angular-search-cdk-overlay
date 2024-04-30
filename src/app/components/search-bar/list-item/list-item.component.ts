import { Highlightable } from '@angular/cdk/a11y';
import { Component, HostBinding, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    MatListItem,
    MatIcon,
  ],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent implements Highlightable {
  @Input() searchFn : (search:string) => void = () => {};
  @Input() onDeleteRecentSearchFn : (search:string) => void = () => {};
  @Input() item = '';
  private _isActive = false;

  @HostBinding('class.active') get isActive() {
    return this._isActive;
  };

  setActiveStyles() {
    this._isActive = true;
  };

  setInactiveStyles() {
    this._isActive = false;
  }

  getLabel() {
    return this.item;
  }

  onClick() {
    this.searchFn(this.item);
  }

  onDelete() {
    this.onDeleteRecentSearchFn(this.item);
  }
}
