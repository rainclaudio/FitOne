import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { clientItem } from './clientItem.model';

@Component({
  selector: 'app-client-nutri',
  templateUrl: './client-nutri.page.html',
  styleUrls: ['./client-nutri.page.scss'],
})
export class ClientNutriPage implements OnInit {
  private copyClientVector: clientItem[] = [];
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.copyClientVector  = this.clientService.getAllClients();
  }
  getVectorCopy(){
    return [...this.copyClientVector];
  }

}
