import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from '../inmueble.service';
import Swal from 'sweetalert2';
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inmueble-form.html',
  styleUrls: ['./inmueble-form.css']
})
export class InmuebleForm implements OnInit {
  inmueble: any = {};
  form!: FormGroup;
  
  id!: number;
  imagenes: string[] = [
  '/inmuebles_nuevos/15.jpg',
  '/inmuebles_nuevos/16.jpg',
  '/inmuebles_nuevos/17.jpg',
  '/inmuebles_nuevos/18.jpg',
  
  '/inmuebles_nuevos/25.jpg',
  '/inmuebles_nuevos/26.jpg',
  '/inmuebles_nuevos/27.jpg',
  '/inmuebles_nuevos/28.jpg',

  '/inmuebles_nuevos/37.jpg',
  '/inmuebles_nuevos/38.jpg',
  '/inmuebles_nuevos/39.jpg',
  '/inmuebles_nuevos/310.jpg',

  '/inmuebles_nuevos/46.jpg',
  '/inmuebles_nuevos/47.jpg',
  '/inmuebles_nuevos/48.jpg',
  '/inmuebles_nuevos/49.jpg',
  '/inmuebles_nuevos/410.jpg',
  '/inmuebles_nuevos/411.jpg',
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: InmuebleService
  ) {}

  seleccionarImagen(img: string) {
    this.inmueble.imagenUrl = img;
  }

  index: number = 0;

  siguiente() {
    this.index = (this.index + 1) % this.imagenes.length;
  }

  anterior() {
    this.index = (this.index - 1 + this.imagenes.length) % this.imagenes.length;
  }

elegirImagen() {

  this.form.patchValue({
    imagenUrl: this.imagenes[this.index]
  });

}

  ngOnInit() {
    //    this.inmueble = data;
    
    
    this.form = this.fb.group({
      
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      
      tipo: [
        'RESIDENCIAL',
        Validators.required
      ],
      
      ciudad: [
        '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]
    ],

    direccion: [
      '',
      [
        Validators.required,
        Validators.maxLength(200)
      ]
    ],

    numero: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]
    ],

    codigoPostal: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]
    ],

    descripcion: [
      '',
      [
        Validators.maxLength(500)
      ]
    ],
    
    imagenUrl: ['',Validators.required]
  });
  
  const idParam = this.route.snapshot.params['id'];
  if (idParam) {
    this.id = +idParam;
    this.service.getById(this.id).subscribe(data => {
  
  this.form.patchValue({
    nombre: data.nombre,
    tipo: data.tipo,
    ciudad: data.ciudad,
    direccion: data.direccion,
    numero: data.numero,
    codigoPostal: data.codigoPostal,
    descripcion: data.descripcion,
    imagenUrl: data.imagenUrl
  });
  
    });
  }
  }


  guardar() {

  if (!this.form.get('imagenUrl')?.value) {

    Swal.fire({
      icon: 'warning',
      title: 'Imagen requerida',
      text: 'Debe seleccionar una imagen para el inmueble.',
      confirmButtonColor: 'rgb(254, 109, 3)',
      iconColor: 'rgb(254, 109, 3)'
    });

    this.form.get('imagenUrl')?.markAsTouched();

    return;
  }

  if (this.form.invalid) {

    this.form.markAllAsTouched();

    Swal.fire({
      icon: 'warning',
      title: 'Formulario incompleto',
      text: 'Por favor complete todos los campos obligatorios.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: 'rgb(254, 109, 3)'
    });

    return;
  }

  const inmueble = this.form.value;

  console.log('Datos simulados enviados:', inmueble);

  if (this.id) {

    Swal.fire({
      icon: 'success',
      title: '¡Actualización exitosa!',
      text: 'El inmueble fue actualizado correctamente.',
      background: '#ffffff',
      color: 'rgb(15, 28, 52)',
      confirmButtonColor: 'rgb(254, 109, 3)',
      iconColor: 'rgb(254, 109, 3)'
    }).then(() => {
      this.router.navigate(['/inmuebles']);
    });

  } else {

    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: 'El inmueble fue registrado correctamente.',
      background: '#ffffff',
      color: 'rgb(15, 28, 52)',
      confirmButtonColor: 'rgb(254, 109, 3)',
      iconColor: 'rgb(254, 109, 3)'
    }).then(() => {
      this.router.navigate(['/inmuebles']);
    });

  }
}


  

  volver() {
    this.router.navigate(['/inmuebles']);
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
