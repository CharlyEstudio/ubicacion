import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('inputCodigo') inputCodigo: ElementRef;
  producto: any;
  encontrado = false;

  msg = '';

  constructor(
    private http: HttpClient
  ) {}

  obtenerUbicacion() {
    this.msg = '';
    this.encontrado = false;
    if (this.inputCodigo.nativeElement.value === '') {
      this.msg = 'Debe de ingresar un código.';
      return;
    }
    const url = 'https://ferremayoristas.com.mx:3001/almacen/ubicacion/' + this.inputCodigo.nativeElement.value;
    this.http.get(url).subscribe((ubicado: any) => {
      if (ubicado.status) {
        this.encontrado = true;
        this.producto = ubicado.respuesta[0];
      }
    });
  }

}
