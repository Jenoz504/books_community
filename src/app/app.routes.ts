import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistroFormComponent } from './components/registro-form/registro-form.component';
import { HomeComponent } from './pages/home/home.component';
import { CrearLibroFormComponent } from './components/crear-libro-form/crear-libro-form.component';
import { CrearPrestamoFormComponent } from './components/crear-prestamo-form/crear-prestamo-form.component';
import { MisLibrosComponent } from './pages/mis-libros/mis-libros.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { MisPrestamosComponent } from './pages/mis-prestamos/mis-prestamos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginFormComponent
    },
    {
        path: 'registro',
        component: RegistroFormComponent
    },
    {
        path: 'crear-libro',
        component: CrearLibroFormComponent
    },
    {
        path: 'actualizar-libro/:id',
        component: CrearLibroFormComponent
    },
    {
        path: 'actualizar-prestamo/:id',
        component: CrearPrestamoFormComponent
    },
    {
        path: 'crear-prestamo',
        component: CrearPrestamoFormComponent
    },
    {
        path: 'mis-libros',
        component: MisLibrosComponent
    },
    {
        path: 'prestamos',
        component: MisPrestamosComponent
    },
    {
        path: 'libros',
        component: LibrosComponent
    },
    {
        path: 'perfil',
        component: PerfilComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
];
