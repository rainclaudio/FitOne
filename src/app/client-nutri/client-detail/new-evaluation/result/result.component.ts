import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { clientItem } from 'src/app/client-nutri/clientItem.model';
import {
  Inter_MedBasicas,
  Inter_Diametros,
  Inter_Perimetros,
  Inter_Pliegues,
  Inter_Indices,
  Inter_TotalResults,
  Inter_Antropodata,
  Inter_Evaluation,
  Inter_Informe,
} from 'src/app/client-nutri/evaluation.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input() clientItem: clientItem;
  @Input() form_med_basicas: FormGroup;
  @Input() form_diametros: FormGroup;
  @Input() form_perimetros: FormGroup;
  @Input() form_pliegues: FormGroup;
  @Input() kg_masa_adiposa: number;
  @Input() kg_masa_muscular: number;
  @Input() kg_masa_residual: number;
  @Input() kg_masa_osea: number;
  @Input() kg_masa_piel: number;

  v_medBasicas: Inter_MedBasicas;
  v_diametros: Inter_Diametros;
  v_perimetros: Inter_Perimetros;
  v_pliegues: Inter_Pliegues;
  v_indices: Inter_Indices;
  v_intertotalR: Inter_TotalResults;
  v_antropodata: Inter_Antropodata;
  v_evaluation: Inter_Evaluation;
  v_informe: Inter_Informe;

  constructor(private modalCtrl: ModalController) {
  }
  createVector(){

  }
  ngOnInit() {
    this.v_medBasicas = new Inter_MedBasicas(
      'id_med_b1',
      this.form_med_basicas.value.peso_corporal,
      this.form_med_basicas.value.estatura_maxima,
      this.form_med_basicas.value.estatura_sentado,
      'id_antropodata1'
    );
    this.v_diametros = new Inter_Diametros(
      'id_diametro_1',
      this.form_diametros.value.biacromial,
      this.form_diametros.value.biliocrestideo,
      this.form_diametros.value.toraxico,
      this.form_diametros.value.torax_anteroposterior,
      this.form_diametros.value.humero,
      this.form_diametros.value.femur,
      'antropodata1'
    );
    this.v_diametros = new Inter_Diametros(
      'id_diametro_1',
      this.form_diametros.value.biacromial,
      this.form_diametros.value.biliocrestideo,
      this.form_diametros.value.toraxico,
      this.form_diametros.value.torax_anteroposterior,
      this.form_diametros.value.humero,
      this.form_diametros.value.femur,
      'antropodata1'
    );
    this.v_perimetros = new Inter_Perimetros(
      'id_perimetro_1',
      this.form_perimetros.value.brazo_relajado,
      this.form_perimetros.value.brazo_flexionado,
      this.form_perimetros.value.antebrazo,
      this.form_perimetros.value.cabeza,
      this.form_perimetros.value.torax,
      this.form_perimetros.value.cintura,
      this.form_perimetros.value.cadera,
      this.form_perimetros.value.muslo_maximo,
      this.form_perimetros.value.muslo_medial,
      this.form_perimetros.value.pantorrilla,
      'antropodata1'
    );
    this.v_pliegues = new Inter_Pliegues(
      'id_pliegues_1',
      this.form_pliegues.value.triceps,
      this.form_pliegues.value.subescapular,
      this.form_pliegues.value.supraespinal,
      this.form_pliegues.value.abdominal,
      this.form_pliegues.value.muslo_anterior,
      this.form_pliegues.value.pantorrilla_medial,
      'antropodata1'
    );
    this.kg_masa_adiposa = +(this.kg_masa_adiposa.toFixed(1));
    this.kg_masa_muscular = +(this.kg_masa_muscular.toFixed(1));
    this.kg_masa_residual = +(this.kg_masa_residual.toFixed(1));
    this.kg_masa_osea = +(this.kg_masa_osea.toFixed(1));
    this.kg_masa_piel = +(this.kg_masa_piel.toFixed(1));
  }

  onCancelResult() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  onConfirmResult() {
    console.log('click');
    this.modalCtrl.dismiss({}, 'confirm');
  }
}
