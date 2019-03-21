import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-line-chart',
    styleUrls: ['./line-chart.component.scss'],
    templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements AfterViewInit {

    @ViewChild('svg') svg: ElementRef;
    @Input('data') data: Array<number>;

    constructor(
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        this.drawChart();
    }

    private drawChart() {
        const xScale = d3.scaleLinear()
            .domain([0, this.data.length - 1])
            .range([0, this.elementRef.nativeElement.offsetWidth]);
        const yScale = d3.scaleLinear()
            .domain([0, this.data.reduce((a, b) => {
                return Math.max(a, b);
            })])
            .range([this.elementRef.nativeElement.offsetHeight, 0]);
        const line = d3.line()
            .x((d, i) => {
                return xScale(i);
            })
            .y((d) => {
                return yScale(d);
            })
            .curve(d3.curveBasis);

        const svg = d3.select(this.svg.nativeElement);
        svg.attr('width', this.elementRef.nativeElement.offsetWidth);
        svg.attr('height', this.elementRef.nativeElement.offsetHeight);
        svg.append('path')
            .datum(this.data)
            .attr('class', 'line')
            .attr('d', line);
    }

}
