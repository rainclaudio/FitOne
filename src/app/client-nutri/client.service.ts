import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {take,map} from 'rxjs/operators';
import { clientItem } from './clientItem.model';
import {
  Inter_MedBasicas,
  Inter_Diametros,
  Inter_Perimetros,
  Inter_Pliegues,
  Inter_Indices,
  Inter_Composicion,
  Inter_TotalResults,
  Inter_Antropodata,
  Inter_Evaluation,
  Inter_Informe,
} from './evaluation.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientVector = new BehaviorSubject<clientItem[]>([]);
  private inter_informe = new BehaviorSubject <Inter_Informe[]>([]);
  private inter_evaluation = new BehaviorSubject<Inter_Evaluation[]>([]);
  private inter_total_result = new BehaviorSubject<Inter_TotalResults[]>([]);
  private inter_composition = new BehaviorSubject<Inter_Composicion[]>([]);
  private inter_indices = new BehaviorSubject<Inter_Indices[]>([]);

  private inter_antropodata = new BehaviorSubject<Inter_Antropodata[]>([]);
  private inter_med_b = new BehaviorSubject<Inter_MedBasicas[]>([]);
  private inter_diametros = new BehaviorSubject<Inter_Diametros[]> ([]);
  private inter_perimetros = new BehaviorSubject<Inter_Perimetros[]>([]);
  private inter_pliegues  =new BehaviorSubject<Inter_Pliegues[]>([]);




  constructor() {
    const newClient = new clientItem(
      'cliente1',
      'Claudio Javier',
      'Rain Levican',
      958636700,
      'rainclaudio25@gmail.com',
      'estudiante Ingeniería'
    );
    const newClient2 = new clientItem(
      'cliente2',
      'Almendra Anaís',
      'Castillo Villaroel',
      912334533,
      'almendra@gmai.com',
      'estudiante Profesora'
    );
    this.clientVector.pipe(take(1)).subscribe(clients => {
      this.clientVector.next(clients.concat(newClient));
    });
    this.clientVector.pipe(take(1)).subscribe(clients => {
      this.clientVector.next(clients.concat(newClient2));
    });

  }
  get clients() {
    return this.clientVector.asObservable();
  }
  getClient(id_client: string) {
    return this.clientVector.pipe(
      take(1),
      map(client => {
        return {...client.find(p => p.id_client = id_client)};
      })
    );
  }
  addClient(
    nombres: string,
    apellidos: string,
    numero: number,
    correo: string,
    ocupacion: string
  ){
    const newClient = new clientItem(
      Math.random().toString(),
      nombres,
      apellidos,
      numero,
      correo,
      ocupacion,
    );
    this.clientVector.pipe(take(1)).subscribe(client => {
      this.clientVector.next(client.concat(newClient));
    });
  }

  add_informe(
    id_informe: string,
    fecha_informe: Date,
    meta:string,
    id_user: string
  ){
    const newInforme = new Inter_Informe(
      id_informe,
      fecha_informe,
      meta,
      id_user
    );
    this.inter_informe.pipe(take(1)).subscribe(informe => {
      this.inter_informe.next(informe.concat(newInforme));
    })
    console.table(this.inter_informe);
  }
  getInformes(id_client: string){
    return this.inter_informe.pipe(
      take(1),
      map(informe => {
        const interInformes = [];
        for(const key in informe){
          if(informe.hasOwnProperty(key)){

          }
        }
      })
    );
  }
  add_inter_Evaluation(
    id_evaluation: string,
    id_informe: string
  ){
    const newEvaluation = new  Inter_Evaluation(
      id_evaluation,
      id_informe
    );
    this.inter_evaluation.pipe(take(1)).subscribe(evaluation => {
      this.inter_evaluation.next(evaluation.concat(evaluation));
    });
  }
  add_antropodata(
    id_antropodata: string,
    id_evaluation: string
  ){
    const newantropodata = new Inter_Antropodata(
      id_antropodata,
      id_evaluation
    );
    this.inter_antropodata.pipe(take(1)).subscribe(antropodata => {
      this.inter_antropodata.next(antropodata.concat(newantropodata));
    });
  }
  add_intertotalresults(
    id_tResults:string,
    id_evaluation: string
  ){
    const newtotal_results= new Inter_TotalResults(
      id_tResults,
      id_evaluation
    );
    this.inter_total_result.pipe(take(1)).subscribe(results => {
      this.inter_total_result.next(results.concat(newtotal_results));
    })
  }
  add_interComposition(
    id_composition:string,
    kg_adiposo: number,
    kg_muscular: number,
    kg_oseo: number,
    kg_piel: number,
    id_tResults: string,
  ){
    const newIntercomposition = new Inter_Composicion(
      id_composition,
      kg_adiposo,
      kg_muscular,
      kg_oseo,
      kg_piel,
      id_tResults
    );
    this.inter_composition.pipe(take(1)).subscribe(composition => {
      this.inter_composition.next(composition.concat(newIntercomposition));
    })
  }
  add_interindice(
    id_indice: string,
    indice_MasaCorporal: number,
    indice_MuscularOseo: number,
    indice_AdiposoMuscular: number,
    indice_sumatoriaPliegues: number,
    id_tResults: string
  ){
    const newinterIndice = new Inter_Indices(
      id_indice,
      indice_MasaCorporal,
      indice_MuscularOseo,
      indice_AdiposoMuscular,
      indice_sumatoriaPliegues,
      id_tResults
    );
    this.inter_indices.pipe(take(1)).subscribe(indice =>{
      this.inter_indices.next(indice.concat(newinterIndice));
    })
  }
  add_interPliegues(
    id_pliegues: string,
    triceps: number,
    subescapular: number,
    supraespinal: number,
    abdominal: number,
    muslo_anterior: number,
    pantorrilla_medial: number,
    id_antropodata
  ){
    const newinterpliegues = new Inter_Pliegues(
      id_pliegues,
      triceps,
      subescapular,
      supraespinal,
      abdominal,
      muslo_anterior,
      pantorrilla_medial,
      id_antropodata
    );
    this.inter_pliegues.pipe(take(1)).subscribe(pliegues =>{
      this.inter_pliegues.next(pliegues.concat(newinterpliegues))
    })
  }
  add_interperimetros(
     id_perimetros: string,
     brazo_relajado: number,
    brazo_flexionado: number,
    antebrazo: number,
    cabeza: number,
    torax: number,
    cintura: number,
    cadera: number,
    muslo_maximo: number,
    muslo_medial: number,
    pantorrilla:number,
    id_antropodata: string
  ){
    const interperimetros = new Inter_Perimetros(
      id_perimetros,
      brazo_relajado,
     brazo_flexionado,
     antebrazo,
     cabeza,
     torax,
     cintura,
     cadera,
     muslo_maximo,
     muslo_medial,
     pantorrilla,
     id_antropodata
    );
    this.inter_perimetros.pipe(take(1)).subscribe(perimetros => {
      this.inter_perimetros.next(perimetros.concat(interperimetros));
    });
  }
add_interdiametros(
 id_diametros: string,
 biacromial: number,
 biliocrestideo: number,
 toraxico: number,
 torax_anteroposterior: number,
 humero: number,
 femur: number,
 id_antropodata: string
){
  const interDiametros = new Inter_Diametros(
    id_diametros,
    biacromial,
    biliocrestideo,
    toraxico,
    torax_anteroposterior,
    humero,
    femur,
    id_antropodata
  );
  this.inter_diametros.pipe(take(1)).subscribe(diametros => {
    this.inter_diametros.next(diametros.concat(interDiametros));
  });
}
add_interMedBasicas(
  id_medbasicas: string,
  peso_corporal: number,
  estatura_maxima:number,
  estatura_sentado: number,
  id_antropodata: string
){
  const interMedBasicas = new Inter_MedBasicas(
    id_medbasicas,
    peso_corporal,
    estatura_maxima,
    estatura_sentado,
    id_antropodata
  );
  this.inter_med_b.pipe(take(1)).subscribe(medb => {
    this.inter_med_b.next(medb.concat(interMedBasicas));
  })
}
}


