import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { LibrosService } from '../../services/libros.service';
import { LibrosModel } from '../../models/LibrosModel';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { lib } from 'crypto-js';

@Component({
  selector: 'app-crear-libro-form',
  standalone: true,
  imports: [MenuComponent, FormsModule],
  templateUrl: './crear-libro-form.component.html',
  styleUrl: './crear-libro-form.component.css'
})
export class CrearLibroFormComponent {
  sourceImagen: String = '../assets/logo.png';
  tituloFormulario: string = "Registro de Libro";
  constructor(private servicioLibro:LibrosService,
              private servicioUsuario:UsuariosService,
              private toastr:ToastrService,
              private router:Router,
              private aRoute: ActivatedRoute
  ) {
    this.asignarIdUsuario();
    
    if (this.aRoute.snapshot.paramMap.get('id')) {
      this.esActualizacion = true;
      this.Libro._id = String (this.aRoute.snapshot.paramMap.get('id'));
      console.log("ID del libro", this.Libro._id);
      this.tituloFormulario = "Actualizar Libro";
      this.traerDatosLibro();
    }
  }
  traerDatosLibro() {
    this.servicioLibro.getLibroById(this.Libro._id).subscribe(data => {
      this.Libro = data;
      this.sourceImagen = "http://localhost:4000/" + this.Libro.imagen;
    });
  }
  idUsuario:String = "";
  esActualizacion:boolean = false;

  
  Libro:LibrosModel = {
    codigo: '',
    nombre: '',
    descripcion: '',
    estado: '',
    propietario: '',
    imagen: '',
  }


  asignarIdUsuario() {
    this.servicioUsuario.getidUsuario().subscribe(id => {
      if (id) {
        this.idUsuario = id;
        this.Libro.propietario = this.idUsuario;
      }
    });
    console.log(this.idUsuario);
  }

  guardarLibro():void {
    if (this.esActualizacion) {
      try {
        if(this.Libro._id){
          console.log(this.Libro)
            this.servicioLibro.actualizarLibro(this.Libro._id,this.Libro).subscribe(res => {
              this.toastr.success("Tu libro se ha actualizado.","¡Libro actualizado con éxito!");
            this.router.navigate(['/home']);
            console.log(res);
            });
        }
      }catch(err) {
        this.toastr.error("Procura que todos los campos estén correctos", "Error");
      } 
    }else{
      try {
        this.servicioLibro.guardarLibro(this.Libro).subscribe(res => {
          this.toastr.success("Ya puedes ver tu libro en la seccion de Mis Libros.","¡Libro registrado con éxito!");
          this.router.navigate(['/home']);
          console.log(res);
        });
      }catch(err) {
        this.toastr.error("Procura que todos los campos estén correctos", "Error");
      }
    }
  }

  //obtener imagen
  capturarFile(event : any): any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any) => {
          this.sourceImagen = imagen.base;
          this.Libro.imagen = imagen.base.substring(23, imagen.base.length);
          console.log(this.Libro.imagen);
         
      // let base64:string = imagen.base.substring(23, imagen.base.length);
    });
    console.log(event.target.files);
  }

  //transformador a base64
  extraerBase64 = async (archivo: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL(archivo);
      // const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      }
      reader.onerror = error => {
        resolve({
          base: ""
        });
      }
      return reader.result;
    } catch (error) {
          return "";
    }
  });
}
