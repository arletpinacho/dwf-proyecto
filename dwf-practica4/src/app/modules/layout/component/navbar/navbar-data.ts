import { NavItem } from './nav-item/nav-item';

/** items de la barra de navegación a los que solo tiene 
acceso un usuario con rol ADMIN */
export const adminNavItems: NavItem[] = [
    {
        displayName: 'Productos',
         route: '/product',         
    },
    {
        displayName: 'Categorías',
         route: '/category',         
    },
    {
        displayName: 'Regiones',
         route: '/region',         
    }
]

/** items de la barra de navegación a los que solo tiene 
acceso un usuario con rol USER */
export const userNavItems: NavItem[] = [
    {
        displayName: 'Productos',
         route: '/products',         
    }
]