import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { LibrosModel } from '../../models/LibrosModel';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mis-libros',
  standalone: true,
  imports: [MenuComponent,RouterLink, CommonModule, RouterLink, RouterModule],
  templateUrl: './mis-libros.component.html',
  styleUrl: './mis-libros.component.css'
})
export class MisLibrosComponent {
  idUsuario: String = '';
  @Input() miniatura:Boolean = true;
  constructor(private servicioLibros:LibrosService,
    private servicioUsuarios:UsuariosService,
    private router:Router,
    private toastr:ToastrService
  ) {
    this.traerLibrosDelUsuario();
  }
  Libro:LibrosModel = {
    codigo: "",
    nombre: "",
    descripcion: "",
    estado: "",
    propietario: ""
  }

  Libros:LibrosModel[] = []
  
  traerLibrosDelUsuario():void {
    this.asignarIdUsuario();
    this.servicioLibros.getLibroByUsuario(this.idUsuario).subscribe(data => {
      this.Libros= data;
      console.log(data);
    });
  }

  asignarIdUsuario() {
    this.servicioUsuarios.getidUsuario().subscribe(id => {
      if (id) {
        this.idUsuario = id;
        this.Libro.propietario = this.idUsuario;
      }
    });
  }
  eliminarLibro(idLibro:String|undefined):void {
    if (idLibro) {
    this.servicioLibros.eliminarLibro(idLibro).subscribe(data => {
      console.log(data);
      this.toastr.info("Actualiza para ver los cambios","Libro eliminado")
    });
    }
  }
}

