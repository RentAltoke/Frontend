import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InquilinoService, Inquilino } from '../inquilino.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inquilino-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inquilino-form.html',
  styleUrls: ['./inquilino-form.css']
})
export class InquilinoForm implements OnInit{
  imagenes: string[] = [
    'inquilinos/EXT-INQ-013.jpg',
    'inquilinos/EXT-INQ-014.jpg',
    'inquilinos/EXT-INQ-015.jpg',
    'inquilinos/EXT-INQ-016.jpg',
    'inquilinos/EXT-INQ-017.jpg',
    'inquilinos/EXT-INQ-018.jpg',
    'inquilinos/EXT-INQ-019.jpg'
  ];
  
  form!: FormGroup;
  index = 0;


  constructor(private inquilinoService: InquilinoService,
    private router: Router,
    private fb: FormBuilder,) {}

    ngOnInit() {

  this.form = this.fb.group({
  tipoPersona: ['NATURAL',Validators.required],
  nombreCompleto: ['',
    [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(120)
    ]],
  documentoIdentidad: ['',[
      Validators.required,
      Validators.pattern(/^[0-9]{8}$|^[0-9]{11}$/)
    ]],
  telefono: ['',[
      Validators.required,
      Validators.pattern(/^[0-9]{9}$/)
    ]],
  email: ['',[
      Validators.required,
      Validators.email]],
  fotoUrl: ['',Validators.required]
});

  }
  
  
  
    siguiente() {
    this.index = (this.index + 1) % this.imagenes.length;
  }

  anterior() {
    this.index = (this.index - 1 + this.imagenes.length) % this.imagenes.length;
  }


elegirImagen() {
  this.form.patchValue({
    fotoUrl: this.imagenes[this.index]
  });
  this.form.get('fotoUrl')?.markAsTouched();
}

guardar() {
  if (!this.form.get('fotoUrl')?.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Imagen requerida',
      text: 'Debe seleccionar una imagen para el inquilino.',
      confirmButtonColor: 'rgb(254, 109, 3)',
      iconColor: 'rgb(254, 109, 3)'});
      this.form.get('fotoUrl')?.markAsTouched();
    return;}

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    Swal.fire({
      icon: 'warning',
      title: 'Formulario incompleto',
      text: 'Por favor complete todos los campos obligatorios.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: 'rgb(254, 109, 3)'
    });return;}

  const codigo = this.form.value.fotoUrl
  .split('/')
  .pop()
  ?.replace('.jpg', '');

const request = {
  ...this.form.value,
  codigo
};

  
  this.inquilinoService.guardar(request).subscribe({
    next: (resp) => {
      console.log(resp);
          Swal.fire({
            icon: 'success',
            title: '¡Actualización exitosa!',
            text: 'El inquilino fue registrado correctamente.',
            background: '#ffffff',
            color: 'rgb(15, 28, 52)',
            confirmButtonColor: 'rgb(254, 109, 3)',
            iconColor: 'rgb(254, 109, 3)'
          }).then(() => {
            this.router.navigate(['/inquilinos']);
          });},
    error: (err) => {
      console.error(err);
          Swal.fire({
            icon: 'warning',
            title: '¡Error!',
            text: 'No se pudo registrar el inquilino.',
            background: '#ffffff',
            color: 'rgb(15, 28, 52)',
            confirmButtonColor: 'rgb(217, 48, 28)',
            iconColor: 'rgb(254, 109, 3)'
          }).then(() => {
            this.router.navigate(['/inquilinos']);
          });
    }
  });
}


  volver() {
    this.router.navigate(['/inquilinos']);
  }



soloLetras(event: KeyboardEvent) {
  const patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;

  if (!patron.test(event.key)) {
    event.preventDefault();
  }
}

soloNumeros(event: KeyboardEvent) {
  const patron = /^[0-9]$/;

  if (!patron.test(event.key)) {
    event.preventDefault();
  }
}

}