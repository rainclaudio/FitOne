import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ClientService } from '../client.service';
import {
  Inter_Antropodata,
  Inter_Diametros,
  Inter_Evaluation,
  Inter_Indices,
  Inter_Informe,
  Inter_MedBasicas,
  Inter_Perimetros,
  Inter_Pliegues,
  Inter_TotalResults,
} from '../evaluation.model';
@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.page.html',
  styleUrls: ['./client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit {
  id_client:string;
  private clientInformes: Inter_Informe[] = [];
  private informeSub: Subscription;
  constructor(private route: ActivatedRoute,
              private navController: NavController,
              private clientService: ClientService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((pmap => {
      if(!pmap.has('id_client')){
        this.navController.navigateBack('client-nutri/tabs');
        return;
      }
      this.id_client = pmap.get('id_client');
      console.log(this.id_client);
    }));

  }
  get client(){
    return this.id_client;
  }

}
