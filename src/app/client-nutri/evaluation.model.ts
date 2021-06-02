
export class Inter_MedBasicas{
 constructor(
  public id_medbasicas: string,
  public peso_corporal: number,
  public estatura_maxima:number,
  public estatura_sentado: number,
  public id_antropodata: string
 ){

 }
}
export class Inter_Diametros{
  constructor(
  public id_diametros: string,
  public biacromial: number,
  public biliocrestideo: number,
  public toraxico: number,
  public torax_anteroposterior: number,
  public humero: number,
  public femur: number,
  public id_antropodata: string){

  }
}
export class Inter_Perimetros{
  constructor(
  public  id_perimetros: string,
  public  brazo_relajado: number,
  public brazo_flexionado: number,
  public antebrazo: number,
  public cabeza: number,
  public torax: number,
  public cintura: number,
  public cadera: number,
  public muslo_maximo: number,
  public muslo_medial: number,
  public pantorrilla:number,
  public id_antropodata: string
  ){

  }
}
export class Inter_Pliegues{
  constructor(
    public id_pliegues: string,
    public triceps: number,
    public subescapular: number,
    public supraespinal: number,
    public abdominal: number,
    public muslo_anterior: number,
    public pantorrilla_medial: number,
    public id_antropodata: string){
  }
}

export class Inter_Indices{
  constructor(
    public id_indices: string,
    public indice_MasaCorporal: number,
    public indice_MuscularOseo: number,
    public indice_AdiposoMuscular: number,
    public indice_sumatoriaPliegues: number,
    public id_tResults: string){

  }
}
export class Inter_Composicion{
  constructor(
  public id_composition: string,
  public kg_adiposo: number,
  public kg_muscular: number,
  public kg_oseo: number,
  public kg_piel: number,
  public id_tResults: string
  ){

  }
}
export class Inter_TotalResults{
  constructor(
    public id_tResults: string,
    public id_evaluation: string
  ){}
}

export class Inter_Antropodata {
  constructor(
    public id_antropodata: string,
    public id_evaluation: string
  ){}
}
export class  Inter_Evaluation{
  constructor(
    public id_evaluation: string,
    public id_informe: string
  ){}
}
export class Inter_Informe{
  constructor(
    public id_informe: string,
    public fecha_informe: Date,
    // mejorar
    public meta: string,
    public id_user: string
    // implementar id_requerimientos;
  ){}
}

