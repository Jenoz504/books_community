import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { CartaLibroComponent } from '../../components/carta-libro/carta-libro.component';
import { CommonModule } from '@angular/common';
import { LibrosService } from '../../services/libros.service';
import { LibrosModel } from '../../models/LibrosModel';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [MenuComponent, CartaLibroComponent, CommonModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {
  idUsuario: String = "";
  constructor(private servicioLibros:LibrosService,
              private servicioUsuario:UsuariosService
  ) {
    this.traerLibros();
  }

  Libros:LibrosModel[] = [ ]; 
 
  traerLibros() {
    this.asignarIdUsuario();
    this.servicioLibros.obtenerLibrosQueNoSonDelUsuario(this.idUsuario).subscribe(data => {
      this.Libros = data;
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
}


