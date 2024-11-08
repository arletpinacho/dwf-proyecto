import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavService } from '../../_service/nav.service';
import { NavItem } from './nav-item/nav-item';
import { adminNavItems, userNavItems } from './navbar-data';
import { AuthenticationService } from '../../../auth/_service/authentication.service';
import { AppNavItemComponent } from './nav-item/nav-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule ,AppNavItemComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor (
    private navService: NavService,
    private authenticationService: AuthenticationService,
    private router: Router
  ){}
  
  /** items de la barra de navegación a los que tiene 
   * acceso cualquier usuario sin importar su rol */
  navItems: NavItem[] = [];
  currentUrl?: string;
  rol: String = '';

  ngOnInit() {
    this.authenticationService.rol.subscribe((role: string) => {
      this.rol = role;
      this.getItems(); // Actualizamos los elementos del navbar
    });

    this.getItems();
    this.navService.currentUrl.subscribe((url: string) => { this.currentUrl = url;});
  }

  getItems() {
    // Elementos disponibles sin importar el rol.
    this.navItems = [
      {
        displayName: 'Login',
        route: '/login',
      },
      {
        displayName: 'Registro',
        route: '/register',
      },
    ];

    // Agrega los elementos según el rol
    if (this.rol === 'ADMIN') {
      this.navItems = adminNavItems.concat(this.navItems);
    } else if (this.rol === 'USER') {
      this.navItems = userNavItems.concat(this.navItems);
    }
  }
  
  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => { this.currentUrl = url});
  }

  showCart() {
    this.router.navigate(['cart']);
  }
}

