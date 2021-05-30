
export interface Inter_MedBasicas{
 id_medbasicas: string;
 peso_corporal: number;
 estatura_maxima:number;
 estatura_sentado: number;
 id_antropodata: string;
}
export interface Inter_Diametros{
  id_diametros: string;
  biacromial: number;
  biliocretideo: number;
  toraxico: number;
  torax_anteroposterior: number;
  humero: number;
  femur: number;
  id_antropodata: string;
}
export interface Inter_Perimetros{
  id_perimetros: string;
  brazo_relajado: number;
  brazo_flexionado: number;
  antebrazo: number;
  cabeza: number;
  torax: number;
  cintura: number;
  cadera: number;
  muslo_maximo: number;
  muslo_medial: number;
  pantorrilla:number;
  id_antropodata: string;
}
export interface Inter_Pliegues{
  id_pliegues: string;
  triceps: number;
  subescapular: number;
  supraespinal: number;
  abdominal: number;
  muslo_anterior: number;
  pantorrilla_number;
  id_antropodata: string;

}
export interface Inter_Indices{
  id_indices: string;
  indice_MasaCorporal: number;
  indice_MuscularOseo: number;
  indice_AdiposoMuscular: number;
  indice_sumatoriaPliegues: number;
  id_tResults: string;
}
export interface Inter_Composicion{
  id_composition: string;
  kg_adiposo: number;
  kg_muscular: number;
  kg_oseo: number;
  kg_piel: number;
  id_tResults: string;
}
export interface Inter_TotalResults{
  id_tResults: string;
  id_evaluation: string;
}

export interface Inter_Antropodata {
  id_antropodata: string;
  id_evaluation: string;
}
export interface  Inter_Evaluation{
  id_evaluation: string;
  id_informe: string;
}
export interface Inter_Informe{
  id_informe: string;
  fecha_informe: Date;
  // mejorar
  meta: string;
  // implementar id_requerimientos;
}

