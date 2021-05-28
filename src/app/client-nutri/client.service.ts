import { Injectable } from '@angular/core';
import { clientItem } from './clientItem.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientVector: clientItem[] = [];
  create_client(
    id_client: string,
    nombres: string,
    apellidos: string,
    telefono: number,
    correo_electronico: string,
    ocupacion: string
  ) {
    const cliente = {
      id_client,
      nombres,
      apellidos,
      telefono,
      correo_electronico,
      ocupacion,
    };
    return cliente;
  }
  constructor() {
    this.clientVector.push(
      this.create_client(
        'cliente1',
        'Claudio Javier',
        'Rain Levican',
        958636700,
        'rainclaudio25@gmail.com',
        'estudiante Ingeniería'
      )
    );
    this.clientVector.push(
      this.create_client(
        'cliente2',
        'Almendra Anaís',
        'Castillo Villaroel',
        912334533,
        'almendra@gmai.com',
        'estudiante Profesora'
      )
    );
  }
  getAllClients(){
    return [...this.clientVector];
  }
}
