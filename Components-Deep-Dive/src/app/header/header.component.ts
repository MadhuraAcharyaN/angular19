import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [ButtonComponent],
})
export class HeaderComponent {}
