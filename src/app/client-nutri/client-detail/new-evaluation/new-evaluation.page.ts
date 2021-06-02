import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ClientService } from '../../client.service';
import { clientItem } from '../../clientItem.model';

import { ResultComponent } from './result/result.component';

@Component({
  selector: 'app-new-evaluation',
  templateUrl: './new-evaluation.page.html',
  styleUrls: ['./new-evaluation.page.scss'],
})
export class NewEvaluationPage implements OnInit {
  id_client: string;
  clientitem: clientItem;
  private clientSub: Subscription;
  form_med_basicas: FormGroup;
  form_diametros: FormGroup;
  form_perimetros: FormGroup;
  form_pliegues: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navController: NavController,
    private clientService: ClientService,
    private modalCtrl: ModalController
  ) {}
  createFormControl() {
    return new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    });
  }
  createFormControl2(defaultValue: number) {
    var form_control = new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    });
    form_control.setValue(defaultValue);
    return form_control;
  }
  ngOnInit() {
    this.route.paramMap.subscribe((pmap) => {
      if (!pmap.has('id_client')) {
        this.navController.navigateBack('client-nutri/tabs');
        return;
      }
      this.id_client = pmap.get('id_client');
      console.log(this.id_client);
      this.clientSub = this.clientService
        .getClient(this.id_client)
        .subscribe((client) => {
          this.clientitem = client;
        });

      this.form_med_basicas = new FormGroup({
        peso_corporal: this.createFormControl2(76.6),
        estatura_maxima: this.createFormControl2(166.5),
        estatura_sentado: this.createFormControl2(90),
      });
      this.form_diametros = new FormGroup({
        biacromial: this.createFormControl2(39.6),
        biliocrestideo: this.createFormControl2(26.9),
        toraxico: this.createFormControl2(24.5),
        torax_anteroposterior: this.createFormControl2(17.5),
        humero: this.createFormControl2(7.1),
        femur: this.createFormControl2(9.5),
      });
      this.form_perimetros = new FormGroup({
        brazo_relajado: this.createFormControl2(36.7),
        brazo_flexionado: this.createFormControl2(39.5),
        antebrazo: this.createFormControl2(30.2),
        // esta ya va por defecto
        cabeza: this.createFormControl2(57.5),
        torax: this.createFormControl2(99.8),
        cintura: this.createFormControl2(81),
        cadera: this.createFormControl2(97.5),
        muslo_maximo: this.createFormControl2(62.5),
        muslo_medial: this.createFormControl2(57.2),
        pantorrilla: this.createFormControl2(40),
      });
      this.form_pliegues = new FormGroup({
        triceps: this.createFormControl2(20),
        subescapular: this.createFormControl2(15),
        supraespinal: this.createFormControl2(19),
        abdominal: this.createFormControl2(24),
        muslo_anterior: this.createFormControl2(24),
        pantorrilla_medial: this.createFormControl2(15),
      });
    });
  }
  resetForms(){
    this.form_med_basicas.reset();
    this.form_diametros.reset();
    this.form_perimetros.reset();
    this.form_pliegues.reset();
  }
  getSumPliegues() {
    return (
      this.form_pliegues.value.triceps +
      this.form_pliegues.value.subescapular +
      this.form_pliegues.value.supraespinal +
      this.form_pliegues.value.abdominal +
      this.form_pliegues.value.muslo_anterior +
      this.form_pliegues.value.pantorrilla_medial
    );
  }
  getSumPerimetrosCorregidos() {
    var brazo_corregido =
      this.form_perimetros.value.brazo_relajado -
      (this.form_pliegues.value.triceps * 3.141) / 10;
    var antebrazo = this.form_perimetros.value.antebrazo;
    var muslo_c =
      this.form_perimetros.value.muslo_maximo -
      (this.form_pliegues.value.muslo_anterior * 3.141) / 10;
    var pantorrila_c =
      this.form_perimetros.value.pantorrilla -
      (this.form_pliegues.value.pantorrilla_medial * 3.141) / 10;
    var torax_c =
      this.form_perimetros.value.torax -
      (this.form_pliegues.value.subescapular * 3.141) / 10;
    return brazo_corregido + antebrazo + muslo_c + pantorrila_c + torax_c;
  }
  getSumDiametros() {
    return (
      this.form_diametros.value.biacromial +
      this.form_diametros.value.biliocrestideo +
      this.form_diametros.value.humero * 2 +
      this.form_diametros.value.femur * 2
    );
  }
  getScoreZadiposo() {
    let var1 =
      this.getSumPliegues() *
      (170.18 / this.form_med_basicas.value.estatura_maxima);
    var1 -= 116.41;
    var1 /= 34.79;
    return var1;
  }
  getScoreZmuscular() {
    var sumaPerimteros = this.getSumPerimetrosCorregidos();
    var var1 =
      sumaPerimteros * (170.18 / this.form_med_basicas.value.estatura_maxima);
    return (var1 - 207.21) / 13.74;
  }
  getScoreZresidual() {
    var perimetroCinturaCorregido =
      this.form_perimetros.value.cintura -
      this.form_pliegues.value.abdominal * 0.3141;
    var sumaTorax =
      this.form_diametros.value.toraxico +
      this.form_diametros.value.torax_anteroposterior +
      perimetroCinturaCorregido;
    var var1 =
      sumaTorax * (89.92 / this.form_med_basicas.value.estatura_sentado);
    return (var1 - 109.35) / 7.08;
  }
  getScoreZcabeza() {
    return (this.form_perimetros.value.cabeza - 56) / 1.44;
  }
  getScoreZoseoCuerpo() {
    var var1 =
      this.getSumDiametros() *
      (170.18 / this.form_med_basicas.value.estatura_maxima);
    return (var1 - 98.88) / 5.53;
  }
  getMasaAdiposa() {
    const scoreZadiposo = this.getScoreZadiposo();
    let var1 = scoreZadiposo * 5.85 + 25.6;
    let var2 = Math.pow(
      170.18 / this.form_med_basicas.value.estatura_maxima,
      3
    );
    return var1 / var2;
  }
  getMasaPiel() {
    var areaSuperficial: number;
    var constAreaSup: number;
    var grosorPiel: number;
    // RECORDATORIO: PONER EL GENERO DEL CLIENTE CON UN SERVICE
    var male = true;
    var age = 19;
    if (male) constAreaSup = 68.308;
    else constAreaSup = 73.074;
    if (age < 12) constAreaSup = 70.691;

    areaSuperficial =
      (constAreaSup *
        Math.pow(this.form_med_basicas.value.peso_corporal, 0.425) *
        Math.pow(this.form_med_basicas.value.estatura_maxima, 0.725)) /
      10000;
    if (male) grosorPiel = 2.07;
    else grosorPiel = 1.96;

    return areaSuperficial * grosorPiel * 1.05;
  }
  getMasaMuscular() {
    var var1 = Math.pow(
      170.18 / this.form_med_basicas.value.estatura_maxima,
      3
    );
    return (this.getScoreZmuscular() * 5.4 + 24.5) / var1;
  }
  getMasaResidual() {
    var var1 = this.getScoreZresidual() * 1.24 + 6.1;
    var var2 = Math.pow(
      89.92 / this.form_med_basicas.value.estatura_sentado,
      3
    );
    return var1 / var2;
  }
  getMasaOseaCabeza() {
    return this.getScoreZcabeza() * 0.18 + 1.2;
  }
  getMasaOseaCuerpo() {
    var var1 = this.getScoreZoseoCuerpo() * 1.34 + 6.7;
    var var2 = Math.pow(
      170.18 / this.form_med_basicas.value.estatura_maxima,
      3
    );
    return var1 / var2;
  }
  getPesoEstructurado() {
    const masa_piel = this.getMasaPiel();
    const masa_adiposa = this.getMasaAdiposa();
    const masa_muscular = this.getMasaMuscular();
    const masa_residual = this.getMasaResidual();
    const masa_oseaCabeza = this.getMasaOseaCabeza();
    const masa_oseaCuerpo = this.getMasaOseaCuerpo();
    return (
      masa_piel +
      masa_adiposa +
      masa_muscular +
      masa_residual +
      masa_oseaCabeza +
      masa_oseaCuerpo
    );
  }
  getPercentMasaAdiposa() {
    return this.getMasaAdiposa() / this.getPesoEstructurado();
  }
  getPercentMasaMuscular() {
    return this.getMasaMuscular() / this.getPesoEstructurado();
  }
  getPercentMasaResidual() {
    return this.getMasaResidual() / this.getPesoEstructurado();
  }
  getPercentMasaOsea() {
    return (
      (this.getMasaOseaCuerpo() + this.getMasaOseaCabeza()) /
      this.getPesoEstructurado()
    );
  }
  getPercentMasaPiel() {
    return this.getMasaPiel() / this.getPesoEstructurado();
  }
  getDif_PE_PBr() {
    const peso_estructurado = this.getPesoEstructurado();
    return peso_estructurado - this.form_med_basicas.value.peso_corporal;
  }
  getAjustesCurrentMass(dif: number, currentPercent: number) {
    return dif * currentPercent;
  }
  getKgMasa_Component(current_mass: number, ajustes: number) {
    const current_masa = current_mass;
    const aj = ajustes;
    return current_mass - ajustes;
  }
  createResult() {
    if (
      !this.form_med_basicas.valid ||
      !this.form_diametros.valid ||
      !this.form_perimetros.valid ||
      !this.form_pliegues.valid
    ) {
      return;
    }
    const sum_pliegues = this.getSumPliegues();
    const dif = this.getDif_PE_PBr();

    const kg_masa_adiposa = this.getKgMasa_Component(
      this.getMasaAdiposa(),
      this.getAjustesCurrentMass(dif, this.getPercentMasaAdiposa())
    );
    const kg_masa_muscular = this.getKgMasa_Component(
      this.getMasaMuscular(),
      this.getAjustesCurrentMass(dif, this.getPercentMasaMuscular())
    );
    const kg_masa_residual = this.getKgMasa_Component(
      this.getMasaResidual(),
      this.getAjustesCurrentMass(dif, this.getPercentMasaResidual())
    );
    const kg_masa_osea = this.getKgMasa_Component(
      this.getMasaOseaCabeza() + this.getMasaOseaCuerpo(),
      this.getAjustesCurrentMass(dif, this.getPercentMasaOsea())
    );
    const kg_masa_piel = this.getKgMasa_Component(
      this.getMasaPiel(),
      this.getAjustesCurrentMass(dif, this.getPercentMasaPiel())
    );

    this.modalCtrl
      .create({
        component: ResultComponent,
        componentProps: {
          clientItem: this.clientitem,
          form_med_basicas: this.form_med_basicas,
          form_diametros: this.form_diametros,
          form_perimetros: this.form_perimetros,
          form_pliegues: this.form_pliegues,
          kg_masa_adiposa: kg_masa_adiposa,
          kg_masa_muscular: kg_masa_muscular,
          kg_masa_residual: kg_masa_residual,
          kg_masa_osea: kg_masa_osea,
          kg_masa_piel: kg_masa_piel,
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          const id_evaluation = Math.random().toString();
          const id_informe = Math.random().toString();
          const id_antropodata = Math.random().toString();
          const id_tResults = Math.random().toString();
          var v1 = new Date();
          const today = v1.getDate();

          this.clientService.add_informe(
            id_informe,
            new Date(today),
            'bajar de peso',
            this.id_client
          );
          this.clientService.add_inter_Evaluation(id_evaluation, id_informe);
          this.clientService.add_antropodata(id_antropodata, id_evaluation);
          this.clientService.add_intertotalresults(id_tResults, id_evaluation);

          this.clientService.add_interComposition(
            Math.random().toString(),
            kg_masa_adiposa,
            kg_masa_muscular,
            kg_masa_osea,
            kg_masa_piel,
            id_tResults
          );
          //AGREGAR INDICES AGREGAR INDICES
          this.clientService.add_interPliegues(
            Math.random().toString(),
            this.form_pliegues.value.triceps,
            this.form_pliegues.value.subescapular,
            this.form_pliegues.value.supraespinal,
            this.form_pliegues.value.abdominal,
            this.form_pliegues.value.muslo_anterior,
            this.form_pliegues.value.pantorrilla_medial,
            id_antropodata
          );
          this.clientService.add_interperimetros(
            Math.random().toString(),
            this.form_perimetros.value.brazo_relajado,
            this.form_perimetros.value.brazo_flexionado,
            this.form_perimetros.value.antebrazo,
            // esta ya va por defecto
            this.form_perimetros.value.cabeza,
            this.form_perimetros.value.torax,
            this.form_perimetros.value.cintura,
            this.form_perimetros.value.cadera,
            this.form_perimetros.value.muslo_maximo,
            this.form_perimetros.value.muslo_medial,
            this.form_perimetros.value.pantorrilla,
            id_antropodata,
          );
          this.clientService.add_interdiametros(
            Math.random().toString(),
            this.form_diametros.value.biacromial,
            this.form_diametros.value.biliocrestideo,
            this.form_diametros.value.toraxico,
            this.form_diametros.value.torax_anteroposterior,
            this.form_diametros.value.humero,
            this.form_diametros.value.femur,
            id_antropodata
          );
          this.clientService.add_interMedBasicas(
            Math.random().toString(),
            this.form_med_basicas.value.peso_corporal,
            this.form_med_basicas.value.estatura_maximo,
            this.form_med_basicas.value.estatura_sentado,
            id_antropodata
          );
          this.resetForms();
          this.router.navigate(['/client-nutri/tabs/client-detail/' + this.id_client]);
          console.log('confirmed');
        }
      });
  }
}
