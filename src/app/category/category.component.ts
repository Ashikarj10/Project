import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  @Output() subcategorySelected = new EventEmitter<string>();
  showSubcategories = false;

  onCategoryClick() {
    this.showSubcategories = !this.showSubcategories;
  }

  onSubcategoryClick(subcategory: string) {
    this.subcategorySelected.emit(subcategory);
    this.showSubcategories = false;
  }
}
