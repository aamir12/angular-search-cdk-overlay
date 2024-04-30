import { Highlightable } from '@angular/cdk/a11y';
import { NgClass } from '@angular/common';
import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    MatListItem,
    MatIcon,
    NgClass
  ],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent implements Highlightable {
  @Input() searchFn : (search:string) => void = () => {};
  @Input() onDeleteRecentSearchFn : (search:string) => void = () => {};
  @Input() item = '';
  private _isActive = false;
  constructor(private host: ElementRef) {}
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

  focus() {
    this.host.nativeElement.focus();
  }

  onClick() {
    console.log("onClicked")
    this.searchFn(this.item);
  }

  onDelete() {
    console.log("onDelete")
    this.onDeleteRecentSearchFn(this.item);
  }
}
