import { Component, Input, OnChanges } from '@angular/core';
import { NavService } from '../../../_service/nav.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavItem } from './nav-item';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../product/_service/category.service';
import { Category } from '../../../../product/_model/category';
import { SharedModule } from '../../../../../shared/shared-module';



@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class AppNavItemComponent implements OnChanges {
  @Input() item: NavItem | any;

  categories: Category[] = [];
  loading = false;

  constructor( 
    private navService: NavService,
    private categoryService: CategoryService,
    public router: Router,
  ) {}

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        this.categories = v;
        console.log(v);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {});
  }

  onItemSelected(item: NavItem) {
    if(item.route != 'url actual'){
      this.router.navigate([item.route]);
    }      
  }

  onSubItemSelected(item: NavItem) {}
}