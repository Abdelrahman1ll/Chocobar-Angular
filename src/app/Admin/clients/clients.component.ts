import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { BackComponent } from '../../../components/back/back.component';
import { ClientsService } from './clients.service';
import { NgFor, NgIf } from '@angular/common';
import { User } from './clients.type';

@Component({
  selector: 'app-clients',
  imports: [HeaderComponent, FooterComponent, BackComponent, NgFor, NgIf],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent {
  isLoading: boolean = true;
  Clients: User[] = [];
  constructor(private clientsService: ClientsService) {
    this.clientsService.getClients().subscribe((data) => {
      if (typeof data === 'object' && data !== null && 'users' in data) {
        this.Clients = (data as { users: User[] }).users;
        this.isLoading = false;
      } else {
        this.Clients = [];
        this.isLoading = false;
      }
    });
  }
}
