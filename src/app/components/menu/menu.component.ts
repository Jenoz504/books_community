import { Component } from '@angular/core';
import { MenuMovilComponent } from '../menu-movil/menu-movil.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuMovilComponent, RouterLink, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
