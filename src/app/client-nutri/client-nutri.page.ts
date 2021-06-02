import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from './client.service';
import { clientItem } from './clientItem.model';

@Component({
  selector: 'app-client-nutri',
  templateUrl: './client-nutri.page.html',
  styleUrls: ['./client-nutri.page.scss'],
})
export class ClientNutriPage implements OnInit {
  copyClientVector: clientItem[] = [];
  private clientSub : Subscription;
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientSub = this.clientService.clients.subscribe(clients => {
      this.copyClientVector = clients;
    });
  }


  getVectorCopy(){
    return [...this.copyClientVector];
  }

}
