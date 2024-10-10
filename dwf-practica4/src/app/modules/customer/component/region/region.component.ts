import { Component } from '@angular/core';
import { Region } from '../../_model/region';
import { RegionService } from '../../_service/region.service';
import { SharedModule } from '../../../../shared/shared-module';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SwalMessages } from '../../../../shared/swal-messages';

declare var $: any; // jquery

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './region.component.html',
  styleUrl: './region.component.css'
})
export class RegionComponent {

  regions:Region[] = []; // lista de regiones

  // formulario región
  form = this.formBuilder.group({
    region: ["", [Validators.required]],
    tag: ["", [Validators.required]],
  });

  current_date = new Date(); // hora y fecha actua

  loading = false; // loading request
  submitted = false; // form submitted

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private formBuilder: FormBuilder,
    private regionService: RegionService
  ){}

  ngOnInit(){
    this.getRegions();
  }

  onSubmit(){

    // validación del formulario 
    this.submitted = true;
    if(this.form.invalid){ return;}
    this.submitted = false;

    this.regionService.createRegion(this.form.value).subscribe({
      next: (v) => {
        console.log(v);
        this.getRegions();
        this.hideModalForm();
        this.form.reset();
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  getRegions(){
    this.loading = true;
    this.regionService.getRegions().subscribe({
      next: (v) => {
        // console.log(v);
        this.regions = v;
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });

  }

  // modal 

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }



}
