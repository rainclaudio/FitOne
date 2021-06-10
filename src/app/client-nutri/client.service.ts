import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
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
  InformeData,
} from './evaluation.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientVector = new BehaviorSubject<clientItem[]>([]);
  private inter_informe = new BehaviorSubject<Inter_Informe[]>([]);
  private inter_evaluation = new BehaviorSubject<Inter_Evaluation[]>([]);
  private inter_total_result = new BehaviorSubject<Inter_TotalResults[]>([]);
  private inter_composition = new BehaviorSubject<Inter_Composicion[]>([]);
  private inter_indices = new BehaviorSubject<Inter_Indices[]>([]);

  private inter_antropodata = new BehaviorSubject<Inter_Antropodata[]>([]);
  private inter_med_basicas = new BehaviorSubject<Inter_MedBasicas[]>([]);
  private inter_diametros = new BehaviorSubject<Inter_Diametros[]>([]);
  private inter_perimetros = new BehaviorSubject<Inter_Perimetros[]>([]);
  private inter_pliegues = new BehaviorSubject<Inter_Pliegues[]>([]);

  private last_id_info: string;
  private last_id_ev: string;
  private last_id_antr: string;
  private last_id_result: string;

  constructor(private http: HttpClient, private authService: AuthService,
    private firestore: AngularFirestore) {
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
    this.addClient(
      'Almendra Anaís',
      'Castillo Villaroel',
      912334533,
      'almendra@gmai.com',
      'estudiante Profesora'
    );
    this.clientVector.pipe(take(1)).subscribe((clients) => {
      this.clientVector.next(clients.concat(newClient));
    });
    this.clientVector.pipe(take(1)).subscribe((clients) => {
      this.clientVector.next(clients.concat(newClient2));
    });
  }
  get clients() {
    return this.clientVector.asObservable();
  }
  getClient(id_client: string) {
    return this.clientVector.pipe(
      take(1),
      map((client) => {
        return { ...client.find((p) => (p.id_client = id_client)) };
      })
    );
  }
  addClient(
    nombres: string,
    apellidos: string,
    numero: number,
    correo: string,
    ocupacion: string
  ) {
    let generatedId: string;
    const newClient = new clientItem(
      Math.random().toString(),
      nombres,
      apellidos,
      numero,
      correo,
      ocupacion
    );
    console.log('posting client');
    return this.http
      .post(
        'https://fit-one-3408c-default-rtdb.firebaseio.com/client-inf.json',
        {
          ...newClient,
          id: null,
        }
      )
      .pipe(
        tap((resData) => {
          console.log(resData);
        })
        // switchMap(resData => {
        //   generatedId = resData.name;
        //   return this.clientVector;
        // }),
        // take(1),
        // tap(clients => {
        //   newClient.id_client = generatedId;
        //   this.clientVector.next(clients.concat(newClient));
        // })
      );
  }
  publish_informe(classInforme: any) {
    console.log("PUBLISHING INFORME");
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('no user id found');
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
          classInforme.id_nutri = fetchedUserId;
          const dataTo_send =  {
             fecha_informe: classInforme.fecha_informe,
             meta: classInforme.meta,
             id_user: classInforme.id_user,
             id_nutri: classInforme.id_nutri
          }
          return this.firestore
          .collection('Informe')
           // .add<{ name: string }>({ ...classInforme, id_informe: null }); // no se puede hacer eso
          .add(dataTo_send);
      }),
      switchMap((resData) => {
        this.last_id_info = resData.id;
        return this.inter_informe.asObservable();
      }),
      take(1),
      tap(info => {
        classInforme.id_informe = this.last_id_info;
        console.log("class INFORME: ");
        console.log(classInforme);
        this.inter_informe.next(info.concat(classInforme));
      })
    );
      // .pipe(
      //   switchMap((resData) => {
      //     console.log('INFORME' + resData);
      //     // this.last_id_antr = resData.name;
      //     return this.inter_antropodata;
      //   });
      // );;
    // necesito la id de este informe: investigar un método para conseguirla
    // cómo hago un override de la id_informe a null: funciona la de arriba??
    // si firestore retorna un observable significa que puedo obtener el id_del objeto publicado?
  }
  add_informe(fecha_informe: Date, meta: string, id_user: string) {
    console.log("CLIENT SERVICE - ADDING INFORME FUNCTION");
    let newInforme: Inter_Informe;
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('no user id found');
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        newInforme = new Inter_Informe(
          'borrable',
          fecha_informe,
          meta,
          id_user,
          fetchedUserId
        );

        console.log(this.inter_informe);
        console.log("new Informe");
        console.log(newInforme);
        console.log("token: ");
        console.log(token);
        return this.http.post<{ name: string }>(
          `https://fit-one-3408c-default-rtdb.firebaseio.com/Informe.json?auth=${token}`,
          {
            ...newInforme,
            id_informe: null,
          }
        );
      }),
      switchMap((resData) => {
        this.last_id_info = resData.name;
        return this.inter_informe.asObservable();
      }),
      take(1),
      tap((info) => {
        newInforme.id_informe = this.last_id_info;
        this.inter_informe.next(info.concat(newInforme));
      })
    );
    /*const newInforme = new Inter_Informe(
      'borrable',
      fecha_informe,
      meta,
      id_user,
   );*/
  }
  get flast_id_info() {
    return this.last_id_info;
  }

  get Informes() {
    return this.inter_informe.asObservable();
  }
  fetch_Informes2(id_user:string){
    let fetchedUserId: string;
    // no podemos usar inter_informe porque la infromación que obtenemos de informe data
    // no es la misma que interinforme, por ejemplo dates se almacenan en forma de strings
    // y la id tenemos que obtenerla de forma manual
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('User not found');
        }
        fetchedUserId = userId;
        return this.authService.token
      }),
      take(1),
      switchMap((token) => {
        return this.firestore.collection('Informe', ref => ref.where('id_nutri','==',fetchedUserId).where('id_user','==',id_user)).snapshotChanges();
      }),
      map((informeData) => {
        const informe = [];

        informeData.forEach((informeData) => {
          var varinfo = {
            id: informeData.payload.doc.id,
            data: informeData.payload.doc.data()
          }
          informe.push(varinfo);
        });
        return informe;
      }),
      tap((informes) => {
        const answer = [];
        console.log("forma final");
        if(informes.length!==0){
          for(let it of informes ){
            answer.push( new Inter_Informe(
              it.id,
              it.data.fecha_informe.toDate(),
              it.data.meta,
              it.data.id_user,
              it.data.id_nutri
            ));
            console.log(it.id);
            console.log(it.data.fecha_informe.toDate());
            console.log(it.data.id_user);
          }
        }
       this.inter_informe.next(answer);
      })
    );
  }
  fetch_Informes(id_user: string) {
    let fetchedUserId: string;
    // no podemos usar inter_informe porque la infromación que obtenemos de informe data
    // no es la misma que interinforme, por ejemplo dates se almacenan en forma de strings
    // y la id tenemos que obtenerla de forma manual
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('User not found');
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        console.log("swithing map token: "+ id_user);
        return this.http.get<{ [key: string]: InformeData }>(
          `https://fit-one-3408c-default-rtdb.firebaseio.com/Informe.json?orderBy="id_nutri"&equalTo="${fetchedUserId}"&auth=${token}`
        );
      }),
      map((informeData) => {
        const informe = [];
        for (const key in informeData) {
          if (informeData.hasOwnProperty(key)) {
            if(informeData[key].id_user === id_user ){
              informe.push(
                new Inter_Informe(
                  key,
                  new Date(informeData[key].fecha_informe),
                  informeData[key].meta,
                  informeData[key].id_user,
                  informeData[key].id_nutri
                )
              );
            }

          }
        }
        console.log("final informe: ");
        console.log(informe);
        return informe;
      }),
      tap((informes) => {
        this.inter_informe.next(informes);
      })
    );
  }

  add_inter_Evaluation() {
    const newEvaluation = new Inter_Evaluation('borrable', this.last_id_info);
    return this.http
      .post<{ name: string }>(
        'https://fit-one-3408c-default-rtdb.firebaseio.com/Evaluation.json',
        {
          ...newEvaluation,
          id_evaluation: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          console.log('estamos en evaluation' + resData.name);
          this.last_id_ev = resData.name;
          return this.inter_evaluation;
        }),
        take(1),
        tap((evaluation) => {
          newEvaluation.id_evaluation = this.last_id_ev;
          this.inter_evaluation.next(evaluation.concat(newEvaluation));
        })
      );
  }
  get flast_id_ev() {
    return this.last_id_ev;
  }
  add_antropodata() {
    console.log('estamos en antropodata' + this.last_id_info);
    const newantropodata = new Inter_Antropodata('borrable', this.flast_id_ev);
    return this.http
      .post<{ name: string }>(
        'https://fit-one-3408c-default-rtdb.firebaseio.com/Antropodata.json',
        {
          ...newantropodata,
          id_antropodata: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          console.log('estamos en antropodata' + resData.name);
          this.last_id_antr = resData.name;
          return this.inter_antropodata;
        }),
        take(1),
        tap((antropodata) => {
          newantropodata.id_antropodata = this.last_id_antr;
          this.inter_antropodata.next(antropodata.concat(newantropodata));
        })
      );
  }
  add_intertotalresults() {
    const newtotal_results = new Inter_TotalResults(
      'temporal',
      this.flast_id_ev
    );

    return this.http
      .post<{ name: string }>(
        'https://fit-one-3408c-default-rtdb.firebaseio.com/Resultado.json',
        {
          ...newtotal_results,
          id_tResults: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          console.log('estamos en antropodata' + resData.name);
          this.last_id_result = resData.name;
          return this.inter_total_result;
        }),
        take(1),
        tap((result) => {
          newtotal_results.id_tResults = this.last_id_result;
          this.inter_total_result.next(result.concat(newtotal_results));
        })
      );
  }

  add_interComposition(data: any, option: string, entityPost: string) {
    data.id_tResults = this.last_id_result;

    let getid: string;
    // `https://ionic-angular-course-d0193-default-rtdb.firebaseio.com/offered-places/${placeId}.json?auth=${fecthedToken}`,

    return this.http
      .post<{ name: string }>(
        `https://fit-one-3408c-default-rtdb.firebaseio.com/${entityPost}.json`,
        {
          ...data,
          id: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          console.log('estamos en pliegues' + resData.name);
          getid = resData.name;
          switch (option) {
            case 'composition':
              return this.inter_composition;
            default:
              break;
          }
        }),
        take(1),
        tap((currentData) => {
          data.id = getid;
          switch (option) {
            case 'composition':
              this.inter_composition.next(currentData.concat(data));
              break;

            default:
              break;
          }
        })
      );
  }
  add_interindice(
    id_indice: string,
    indice_MasaCorporal: number,
    indice_MuscularOseo: number,
    indice_AdiposoMuscular: number,
    indice_sumatoriaPliegues: number,
    id_tResults: string
  ) {
    const newinterIndice = new Inter_Indices(
      id_indice,
      indice_MasaCorporal,
      indice_MuscularOseo,
      indice_AdiposoMuscular,
      indice_sumatoriaPliegues,
      id_tResults
    );
    this.inter_indices.pipe(take(1)).subscribe((indice) => {
      this.inter_indices.next(indice.concat(newinterIndice));
    });
  }
  add_interAntropodataInfo(data: any, option: string, entityPost: string) {
    data.id_antropodata = this.last_id_antr;

    let getid: string;
    // `https://ionic-angular-course-d0193-default-rtdb.firebaseio.com/offered-places/${placeId}.json?auth=${fecthedToken}`,

    return this.http
      .post<{ name: string }>(
        `https://fit-one-3408c-default-rtdb.firebaseio.com/${entityPost}.json`,
        {
          ...data,
          id: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          getid = resData.name;
          switch (option) {
            case 'pliegue':
              return this.inter_pliegues;
            case 'perimetro':
              return this.inter_perimetros;
            case 'diametro':
              return this.inter_diametros;
            case 'medbasica':
              return this.inter_med_basicas;
            default:
              break;
          }
        }),
        take(1),
        tap((currentData: any) => {
          data.id = getid;
          switch (option) {
            case 'pliegue':
              this.inter_pliegues.next(currentData.concat(data));
              break;
            case 'perimetro':
              this.inter_perimetros.next(currentData.concat(data));
              break;
            case 'diametro':
              this.inter_diametros.next(currentData.concat(data));
              break;
            case 'medbasica':
              this.inter_med_basicas.next(currentData.concar(data));
              break;
            default:
              break;
          }
        })
      );
  }
  add_interPliegues(newinterpliegues: Inter_Pliegues) {
    newinterpliegues.id_antropodata = this.last_id_antr;
    let idpliegue: string;
    return this.http
      .post<{ name: string }>(
        'https://fit-one-3408c-default-rtdb.firebaseio.com/Pliegue.json',
        {
          ...newinterpliegues,
          id: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          console.log('estamos en pliegues' + resData.name);
          idpliegue = resData.name;
          return this.inter_pliegues;
        }),
        take(1),
        tap((pliegues) => {
          newinterpliegues.id = idpliegue;
          this.inter_pliegues.next(pliegues.concat(newinterpliegues));
        })
      );
  }
  add_interperimetros(interperimetros: Inter_Perimetros) {
    interperimetros.id_antropodata = this.last_id_antr;
    let id_perimetro: string;
    return this.http
      .post<{ name: string }>(
        'https://fit-one-3408c-default-rtdb.firebaseio.com/Perimetro.json',
        {
          ...interperimetros,
          id: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          console.log('estamos en pliegues' + resData.name);
          id_perimetro = resData.name;
          return this.inter_perimetros;
        }),
        take(1),
        tap((perimetro) => {
          interperimetros.id = id_perimetro;
          this.inter_perimetros.next(perimetro.concat(interperimetros));
        })
      );
  }
  add_interdiametros(newDiametro: Inter_Diametros) {
    newDiametro.id_antropodata = this.last_id_antr;
    let id_diametro: string;
    return this.http
      .post<{ name: string }>(
        'https://fit-one-3408c-default-rtdb.firebaseio.com/Diametro.json',
        {
          ...newDiametro,
          id_diametros: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          console.log('estamos en pliegues' + resData.name);
          id_diametro = resData.name;
          return this.inter_diametros;
        }),
        take(1),
        tap((perimetro) => {
          newDiametro.id = id_diametro;
          this.inter_diametros.next(perimetro.concat(newDiametro));
        })
      );
  }
  add_interMedBasicas(intermedbasicas: Inter_MedBasicas) {
    intermedbasicas.id_antropodata = this.last_id_antr;
    let id_medb: string;
    return this.http
      .post<{ name: string }>(
        'https://fit-one-3408c-default-rtdb.firebaseio.com/MedicionBasica.json',
        {
          ...intermedbasicas,
          id_medbasicas: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          console.log('estamos en pliegues' + resData.name);
          id_medb = resData.name;
          return this.inter_med_basicas;
        }),
        take(1),
        tap((medb) => {
          intermedbasicas.id = id_medb;
          this.inter_med_basicas.next(medb.concat(intermedbasicas));
        })
      );
  }
}
