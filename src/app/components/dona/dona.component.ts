import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html'
})
export class DonaComponent implements OnInit {

  @Input() titulo = 'Sin Titulo'
  @Input() data: ChartData<'doughnut'> = {
    labels: [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ],
    datasets: [{ data: [ 350, 450, 100 ] }]
  };

  constructor() {}

  ngOnInit(): void {
  }

}
