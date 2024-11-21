import { Component, Input, OnChanges } from '@angular/core';
import { NavService } from '../../../_service/nav.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavItem } from './nav-item';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../product/_service/category.service';
import { Category } from '../../../../product/_model/category';
import { SharedModule } from '../../../../../shared/shared-module';
import { AuthenticationService } from '../../../../auth/_service/authentication.service';



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
  rol: String = '';
  isDrawerOpen = false;

  constructor( 
    private navService: NavService,
    private categoryService: CategoryService,
    private authenticationService: AuthenticationService,
    public router: Router,
  ) {
    
    this.authenticationService.rol.subscribe((role: string) => {
      this.rol = role;
    });   
  }

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

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
    if (this.isDrawerOpen) {
      this.getCategories(); // Si se abre el drawer, obtenemos las categorías
    }
  }
}