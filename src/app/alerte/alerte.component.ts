import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { AlerteModel } from './alerte.model';
@Component({
  selector: 'app-alerte',
  templateUrl: './alerte.component.html',
  styleUrls: ['./alerte.component.css']
})
export class AlerteComponent implements OnInit {
  formValue !: FormGroup;
  alerteData !: any;
  alerteModelObj : AlerteModel = new AlerteModel();
  showAdd !:boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder , private api : ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      intitule : [''],
      niveau : [''],
      description : [''],
      date : [''],
      progression : [''],
      creer : [''],
      destinataire: [''], 
    })
    this.getAllAlerte();
  }
  clickAddAlerte(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postAlerteDetails(){
    this.alerteModelObj.intitule = this.formValue.value.intitule;
    this.alerteModelObj.niveau = this.formValue.value.niveau;
    this.alerteModelObj.description = this.formValue.value.description;
    this.alerteModelObj.date = this.formValue.value.date;
    this.alerteModelObj.progression = this.formValue.value.progression;
    this.alerteModelObj.creer = this.formValue.value.creer;
    this.alerteModelObj.destinataire = this.formValue.value.destinataire;

    this.api.postAlerte(this.alerteModelObj)
    .subscribe(res => {
      console.log(res);
      alert("Alerte ajoutée avec succes")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllAlerte();
    },
     err =>{
      alert("Something went")
    })
  }
getAllAlerte(){
  this.api.getAlerte()
  .subscribe(res=>{
    this.alerteData = res;
  })
}
deleteAlerte(row : any){
this.api.deleteAlerte(row.id)
.subscribe(res=>{
  alert("Alerte supprimer");
  this.getAllAlerte();

})
}
onEdit(row : any){
  this.alerteModelObj.id = row.id;
  this.showAdd = false;
  this.showUpdate = true;
  this.formValue.controls['intitule'].setValue(row.intitule);
  this.formValue.controls['niveau'].setValue(row.niveau);
  this.formValue.controls['progression'].setValue(row.progression);
  this.formValue.controls['date'].setValue(row.date);
  this.formValue.controls['creer'].setValue(row.creer);
  this.formValue.controls['destinataire'].setValue(row.destinataire);

}
updateAlerteDetails(){
  this.alerteModelObj.intitule = this.formValue.value.intitule;
  this.alerteModelObj.niveau = this.formValue.value.niveau;
  this.alerteModelObj.description = this.formValue.value.description;
  this.alerteModelObj.date = this.formValue.value.date;
  this.alerteModelObj.progression = this.formValue.value.progression;
  this.alerteModelObj.creer = this.formValue.value.creer;
  this.alerteModelObj.destinataire = this.formValue.value.destinataire;

this.api.updateAlerte(this.alerteModelObj,this.alerteModelObj.id)
.subscribe(res=>{
  alert('Alerte mise a jour');
  let ref = document.getElementById('cancel');
  ref?.click();
  this.formValue.reset();
  this.getAllAlerte();
})

}
}
