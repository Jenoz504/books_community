import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrestamosService } from '../../services/prestamos.service';
import { PrestamosModel } from '../../models/PrestamosModel';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-mis-prestamos',
  standalone: true,
  imports: [MenuComponent,RouterLink, CommonModule],
  templateUrl: './mis-prestamos.component.html',
  styleUrl: './mis-prestamos.component.css'
})


export class MisPrestamosComponent {
  @Input() miniatura:Boolean = true;
  idUsuario: String = "";
  constructor(private router: Router,
              private servicioPrestamos:PrestamosService,
              private servicioUsuario:UsuariosService,
              private toastr:ToastrService
  ){
    this.asignarIdUsuario();
    this.traerPrestamosDelUsuario();
  }

  traerPrestamosDelUsuario() {
    this.servicioPrestamos.obtenerPrestamosDelUsuario(this.idUsuario).subscribe(data=>{
      this.Prestamos = data;
      console.log(data);
    });
  }

  asignarIdUsuario() {
    this.servicioUsuario.getidUsuario().subscribe(id => {
      if (id) {
        this.idUsuario = id;
      }
    });
  }

  Prestamo:PrestamosModel = {
    libro: "",
    idPropietario: "",
    fechaPrestamo: "",
    fechaDevolucion: "",
    prestador: ""
  }

  Prestamos:PrestamosModel[] = []
  
  eliminarPrestamo(idprestamo: String|undefined) {
    if (idprestamo) {
      this.servicioPrestamos.eliminarPrestamo(idprestamo).subscribe(data => {
        console.log(data);
        this.toastr.info("Actualiza para ver los cambios","Libro eliminado")
      });
      }
  }
}
