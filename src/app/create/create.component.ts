import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid) {
      this.service.getSingleData(this.getparamid).subscribe((res)=> {
        console.log(res, "res==>");
        this.medicamentosForm.patchValue({
          nombre:res.data[0].nombre,
          cantidad:res.data[0].cantidad
        })
      });
    }
  }

  medicamentosForm = new FormGroup({
    'nombre':new FormControl('',Validators.required),
    'cantidad':new FormControl('',Validators.required)
  });

  // createnewmedicamento
  medicamentosSubmit() {
    if(this.medicamentosForm.valid) {
      console.log(this.medicamentosForm.value);
      this.service.createData(this.medicamentosForm.value).subscribe((res)=>{
        console.log(res, 'res==>');
        this.medicamentosForm.reset();
        this.successmsg = '¡Datos creados satisfactoriamente!';

      })

    } else {
      this.errormsg = '¡Todos los campos son requeridos!';
    }

    // this.medicamentosForm.markAllAsTouched();
  }


  // updatedata
  medicamentosUpdate() {
    console.log(this.medicamentosForm.value, 'updatedform');
    if(this.medicamentosForm.valid) {
      this.service.updateData(this.medicamentosForm.value, this.getparamid).subscribe((res)=> {
        console.log(res,'resupdated==>');
        this.successmsg = '¡Datos editados satisfactoriamente!';
        // this.medicamentosForm.reset();
      })
    } else {
      this.errormsg = '¡Todos los campos son requeridos!';
    }
  }


}
