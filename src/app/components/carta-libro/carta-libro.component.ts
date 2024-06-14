import { Component, Input , OnInit} from '@angular/core';
import { LibrosModel } from '../../models/LibrosModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carta-libro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './carta-libro.component.html',
  styleUrl: './carta-libro.component.css'
})

export class CartaLibroComponent {
  base64:String = "";
  urlImagen:String = "http://localhost:4000/";

  @Input() libro:LibrosModel = {
    codigo: "",
    nombre: "",
    descripcion: "",
    estado: "",
    propietario: "",
    imagen: ""
  };

  ngOnInit() {

  };

  obtenerImagen(event : any): any {
      console.log("ObtenerImagen");
      const archivoCapturado = event.target.files[0];
      this.extraerBase64(archivoCapturado).then((imagen:any) => {
      this.libro.imagen = imagen.base;
      this.base64 = imagen.base.substring(23, imagen.base.length);
      console.log(imagen.base64);
    });
  }

  extraerBase64 = async (archivo: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL(archivo);
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
