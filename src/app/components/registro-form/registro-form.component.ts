import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuariosModel } from '../../models/UsuarioModel';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from '../../services/usuarios.service';
import {  ToastrService } from 'ngx-toastr';
import { desencriptar, encriptar } from '../../util/util-encrypt';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-form',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule,CommonModule],
  templateUrl: './registro-form.component.html',
  styleUrl: './registro-form.component.css'
})
export class RegistroFormComponent {
  constructor(
    private servicioUsuario: UsuariosService,

    private router: Router
    ) {
      
    }
  confirmarContrasena: string = "";
  Usuario: UsuariosModel = {
    nombre: "",
    usuario: "",
    contrasena: "",
    contacto: "",
    imagen: ""
  }

  contrasenasCoinciden(): boolean {
    return this.Usuario.contrasena  == this.confirmarContrasena;
  }
  registrarUsuario(): void {
    if (this.contrasenasCoinciden()) {
      this.Usuario.contrasena = encriptar(this.Usuario.contrasena.toString());
      this.servicioUsuario.guardarUsuario(this.Usuario).subscribe(res => {
        // this.toastr.success("Ya puedes iniciar sesión.","¡Estudiante registrado con éxito!");
        this.router.navigate(['/login']);
        console.log(res);
      });
    }else{
      // this.toastr.error("El usuario o la contraseña no coinciden", "Error");
    }
  }
}
