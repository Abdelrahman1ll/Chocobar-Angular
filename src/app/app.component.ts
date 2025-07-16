import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NetworkStatusComponent } from '../components/network-status/network-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NetworkStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
