import { Component, OnInit } from '@angular/core';
import { PrestamosModel } from '../../models/PrestamosModel';
import { PrestamosService } from '../../services/prestamos.service';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosModel } from '../../models/UsuarioModel';
import { LibrosModel } from '../../models/LibrosModel';
import { LibrosService } from '../../services/libros.service';
import { CommonModule } from '@angular/common';

interface usuarioInterface {
  valorReal?: String;
  valorVisto?: String;
}
interface libroInterface {
  valorReal?: String;
  valorVisto?: String;
}

@Component({
  selector: 'app-crear-prestamo-form',
  standalone: true,
  imports: [MenuComponent,FormsModule,CommonModule],
  templateUrl: './crear-prestamo-form.component.html',
  styleUrl: './crear-prestamo-form.component.css'
})



export class CrearPrestamoFormComponent {
  idUsuario: String = "";
  tituloFormulario: String = "Registrar prestamo";
  esActualizacion: Boolean = false;
  usuarioSeleccionado: String = "";
  libroSeleccionado: String = "";

  selectLibro: libroInterface[] = [
    {valorReal: '', valorVisto: 'Seleccionar'},
  ];
  selectUsuario:usuarioInterface [] = [
    {valorReal: '', valorVisto: 'Seleccionar'},
  ];

  constructor(private servicioPrestamo:PrestamosService,
              private servicioUsuario:UsuariosService,
              private servicioLibro:LibrosService,
              private toastr:ToastrService,
              private router:Router,
              private aRoute:ActivatedRoute
  ){
    if(this.aRoute.snapshot.paramMap.get('id')){
      this.Prestamo._id = String (this.aRoute.snapshot.paramMap.get('id'));
      this.esActualizacion = true;
      this.tituloFormulario = "Actualizar prestamo";
      this.traerDatosPrestamo();
    }
    this.asignarIdUsuario();
  }

  arregloUsuario:UsuariosModel[] = [];
  arregloLibros:LibrosModel[] = [];

  ngOnInit() {
    this.traerLibrosDelUsuario();
    this.traerUsuario();
  }

  traerUsuario() {
    this.servicioUsuario.traerUsuarios().subscribe(data => {
      this.arregloUsuario = data;
    });
  }

  traerLibrosDelUsuario() {
    this.servicioLibro.getLibroByUsuario(this.idUsuario).subscribe(data => {
      this.arregloLibros = data;
    });
  }

  Prestamo:PrestamosModel = {
    libro: '',
    idPropietario: '',
    fechaPrestamo: '',
    fechaDevolucion: '',
    prestador: ''
  }

  traerDatosPrestamo() {
    this.servicioPrestamo.obtenerPrestamoPorId(this.Prestamo._id).subscribe(data => {
      this.Prestamo = data;
    });
  }
  asignarIdUsuario() {
    this.servicioUsuario.getidUsuario().subscribe(id => {
      if (id) {
        this.idUsuario = id;
        console.log(this.idUsuario);
      }
    });
  }
  guardarPrestamo(): void {
      if (this.esActualizacion) {
        try {
          this.Prestamo.prestador = this.idUsuario;
          if(this.Prestamo._id ){
              this.servicioPrestamo.actualizarPrestamo(this.Prestamo._id, this.Prestamo).subscribe(res=>{
                console.log(res)
              this.toastr.success("Prestamo actualizado con exito","Prestamo Actualizado!");
            this.router.navigate(['/home']);
            });
          }
        } catch (err) {
         this.toastr.error("Revisa que todos los campos esten correctos","Ha ocurrido un error!");
        } 
      }else{
        try {
          this.Prestamo.prestador = this.idUsuario;
          this.servicioPrestamo.guardarPrestamo(this.Prestamo).subscribe(res=>{
            console.log(res)
          this.toastr.success("Prestamo registrado con exito","Prestamo registrado!");
          this.router.navigate(['/home']);
        });
        } catch (err) {
         this.toastr.error("Revisa que todos los campos esten correctos","Ha ocurrido un error!");
        }
    }
  }
}
