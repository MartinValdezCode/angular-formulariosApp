import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent{

  nuevoJuego: string = '';

  @ViewChild('miFormulario') miFormulario! : NgForm;


  persona: Persona = {
    nombre: 'Martin',
    favoritos: [
      {
        id: 1,
        nombre: 'Doom'
      },
      {
        id: 2,
        nombre: 'Monkey Island'
      }
    ]
  }
  nombreValido() {
    return this.miFormulario?.controls['nombre']?.errors &&
           this.miFormulario?.controls['nombre']?.touched;
  }
  guardar() {
    console.log('Enviar al back: ', this.miFormulario.form.value);
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }

  agregarJuego() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }
}
