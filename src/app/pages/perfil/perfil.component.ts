import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosModel } from '../../models/UsuarioModel';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  idUsuario: String = "";
  constructor(private servicioUsuario:UsuariosService
  ) {
    this.asignarIdUsuario();
    this.trearDatosUsuarioActual();
  }


  asignarIdUsuario() {
    this.servicioUsuario.getidUsuario().subscribe(id => {
      if (id) {
        this.idUsuario = id;
      }
    });
  }

  trearDatosUsuarioActual() {
    this.servicioUsuario.getUsuarioById(this.idUsuario).subscribe(data=>{
      this.Usuario = data;
      console.log(data);
    })
  }

  Usuario:UsuariosModel = {
    nombre: "",
    usuario: "",
    contrasena: "",
    contacto: ""
  }
  

}
