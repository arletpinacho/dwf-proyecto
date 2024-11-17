import { NavItem } from './nav-item/nav-item';

/** items de la barra de navegación a los que solo tiene 
acceso un usuario con rol ADMIN */
export const adminNavItems: NavItem[] = [
    {
        displayName: 'Clientes',
         route: '/customer',         
    },
    {
        displayName: 'Facturas',
         route: '/invoice',         
    },
    {
        displayName: 'Productos',
         route: '/product',         
    },
    {
        displayName: 'Categorías',
         route: '/category',         
    }
]

/** items de la barra de navegación a los que solo tiene 
acceso un usuario con rol USER */
export const userNavItems: NavItem[] = [
    {
        displayName: 'Productos',
         route: 'url actual',         
    }
]