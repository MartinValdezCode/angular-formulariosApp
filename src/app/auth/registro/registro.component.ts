import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { emailPattern, nombreApellidoPattern, noPuedeSerTincho } from 'src/app/shared/validators/validaciones';
import { ValidatorsService } from '../../shared/validators/validators.service';
import { EmailValidatorService } from '../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerTincho]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, {
    validators: [ this.validatorService.camposIguales('password','password2')]
  });

  

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if(errors?.['required']) {
      return 'Email es obligatorio';
    } else if(errors?.['pattern']) {
      return 'El valor ingresado no tiene el formato correcto'
    } else if(errors?.['emailTomado']) {
      return 'Este email ya existe'
    }

    return '';
  }
  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Martin Valdez',
      email: 'valdez.martin.code@gmail.com',
      username: 'Tincho',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid &&
           this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }
}
