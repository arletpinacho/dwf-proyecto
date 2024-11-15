import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './_service/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  
  let estaLlogeado = inject(AuthenticationService).isUserLoggedIn();
  console.log(estaLlogeado);
  if(!estaLlogeado){
    console.log('No esta loggeado');
    return inject(Router).navigate(['/login']);
  }
  
  return true;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  // Obtén el rol del usuario
  const userRole = authenticationService.getUserRol();
  console.log(userRole);
  if (userRole != 'ADMIN') {
    console.log('No tiene acceso a esta ruta. Para acceder ingrese con una cuenta de administrador.');
    return inject(Router).navigate(['/login']);
  }

  return true; // Permite la navegación si el rol es admin
};

export const userGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  // Obtén el rol del usuario
  const userRole = authenticationService.getUserRol();
  console.log(userRole);
  if (userRole != 'USER') {
    console.log('No tiene acceso a esta ruta. Para acceder ingrese con una cuenta de cliente.');
    return inject(Router).navigate(['/login']);
  }

  return true; // Permite la navegación si el rol es admin
};