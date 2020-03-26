import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  path = `https://ferremayoristas.com.mx`;
  // path = `http://192.168.1.251`;

  head = new HttpHeaders();
  headers = this.head.append('auth', 'api-php-2020');

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
    const url = this.path + ':3001/almacen/ubicacion/' + this.inputCodigo.nativeElement.value;
    // const url = `${this.path}/services/almacen/ubicacion/producto/${this.inputCodigo.nativeElement.value}/datosb`;
    this.http.get(url).subscribe((ubicado: any) => {
      console.log(ubicado);
    // this.http.get(url, { headers: this.headers }).subscribe((ubicado: any) => {
      if (ubicado.status) {
        this.encontrado = true;
        this.producto = ubicado.respuesta[0];
      }
      // if (ubicado.resp !== false) {
      //   this.encontrado = true;
      //   this.producto = ubicado.resp;
      // }
      this.inputCodigo.nativeElement.value = '';
    });
  }

}
