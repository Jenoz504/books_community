import { Component, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { desencriptar, encriptar } from '../../util/util-encrypt';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosModel } from '../../models/UsuarioModel';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, FormsModule,HttpClientModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  hide = true;
  contrasenaEncriptada: string = '';
  constructor( private servicioUsuario: UsuariosService,
              private toastr: ToastrService,
              private router: Router
  ) { }

  Usuario: UsuariosModel = {
    nombre: "",
    usuario: "",
    contrasena: "",
    contacto: "",
    imagen: ""
  }

  verificarUsuario(): void {
    this.servicioUsuario.getUsuarioPorUsuario(this.Usuario.usuario).subscribe(data => {
      this.Usuario.nombre = data.nombre;
      this.Usuario._id = data._id;
      this.contrasenaEncriptada =String(desencriptar(data.contrasena.toString()));
      if (this.lasContrasenasCoinciden(this.contrasenaEncriptada)) {
        this.toastr.success(`Es un placer tenerte por aqui, ${data.nombre} .`,"Bienvenido!");
        console.log(`Es un placer tenerte por aqui, ${data.nombre} .`,"Bienvenido!");
        this.router.navigate(['/home']);
        this.servicioUsuario.setidUsuario(String (this.Usuario._id));
      }else{
        this.toastr.error("El usuario o la contraseña no coinciden", "Error");
        console.log("error")
      }
    }, error =>{
      this.toastr.error("Procura llenar todos los campos", "No se ha podido iniciar sesión");
    });
  }
  lasContrasenasCoinciden(contrasena: any) {
    if (this.Usuario.contrasena   == contrasena) {
      return true
    }
    return false;
  }
}
