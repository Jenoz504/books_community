import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosModel } from '../../models/UsuarioModel';
import { MisLibrosComponent } from '../mis-libros/mis-libros.component';
import { MisPrestamosComponent } from '../mis-prestamos/mis-prestamos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, MisLibrosComponent, MisPrestamosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  idUsuario: String = "";
  constructor (private servicioUsuario:UsuariosService) {

    this.asignarIdUsuario();
    this.traerUsuario();
  }

  ngOninit () {
  }
  Usuario: UsuariosModel = {
    nombre: "",
    usuario: "",
    contrasena: "",
    contacto: "",
    imagen: ""
  }

  asignarIdUsuario() {
    this.servicioUsuario.getidUsuario().subscribe(id => {
      if (id) {
        this.idUsuario = id;
      }
    });
  }
  traerUsuario() {
    this.servicioUsuario.getUsuarioById(this.idUsuario).subscribe(data => {
      this.Usuario = data;
    });
  }
}
