import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_service/authentication.service';
import { SwalMessages } from '../../../../shared/swal-messages';

@Component({
  selector: 'app-secured',
  standalone: true,
  imports: [],
  templateUrl: './secured.component.html',
  styleUrl: './secured.component.css'
})
export class SecuredComponent {
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  public onLogOut(): void {
    this.swal.confirmMessage.fire({
      title: "¿Cerrar sesión?",
      text: "Es posible que requieras ingresar de nuevo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.authenticationService.logOut();
        this.router.navigate(['/login']);
        this.swal.successMessage("Sesión cerrada exitosamente");
      }
    });
  }

}
