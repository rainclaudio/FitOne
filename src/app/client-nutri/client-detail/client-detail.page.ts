import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.page.html',
  styleUrls: ['./client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit {
  id_client:string;
  constructor(private route: ActivatedRoute,
              private navController: NavController) { }

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
