import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 50;
  @Input() btnClass: string = "btn btn-primary";
  @Output() valorSalida: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  get getProgress() {
    return `${ this.progreso }%`;
  }

  cambiarValor(valor: number) {
    if(this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
    } else if(this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
    } else {
      this.progreso = this.progreso + valor;
    }

    this.valorSalida.emit(this.progreso);
  }

  onChange(valor: number | null) {

    if(valor !== null) {
      if(valor >= 100) {
        this.progreso = 100;
      } else if(valor <= 0) {
        this.progreso = 0;
      } else {
        this.progreso = valor;
      }
      this.valorSalida.emit(this.progreso);
    } else {
      this.valorSalida.emit(0);
    }
  }
}
