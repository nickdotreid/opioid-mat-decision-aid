import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-line-chart',
    styleUrls: ['./line-chart.component.scss'],
    templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements AfterViewInit {

    @ViewChild('svg') svg: ElementRef;
    @Input('ticks') ticks: Array<number>;
    public data: Array<number>;

    constructor(
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        this.drawChart();
    }

    @Input('data')
    set setData(value) {
        if (value) {
            this.data = value;
            this.drawChart();
        }
    }

    private drawChart() {
        if (!this.data || this.data.length === 0) {
            return false;
        }
        const width = this.elementRef.nativeElement.offsetWidth;
        const height = this.elementRef.nativeElement.offsetHeight;

        const xScaleMax = this.ticks.reduce((a, b) => {
            return Math.max(a, b);
        });
        const yScaleMax = this.data.reduce((a, b) => {
            return Math.max(a, b);
        });

        const xScale = d3.scaleLinear()
            .domain([0, xScaleMax])
            .range([0, width]);
        const yScale = d3.scaleLinear()
            .domain([0, yScaleMax])
            .range([height, 0]);
        const line = d3.line()
            .x((d, i) => {
                return xScale(this.ticks[i]);
            })
            .y((d) => {
                return yScale(d);
            })
            .curve(d3.curveBasis);
        const area = d3.area()
        .x((d, i) => {
            return xScale(this.ticks[i]);
        })
        .y0(height)
        .y1((d) => {
            return yScale(d);
        })
        .curve(d3.curveBasis);


        const svg = d3.select(this.svg.nativeElement);
        svg.attr('width', width);
        svg.attr('height', height);

        const chartArea = svg.select('.chart path.area');
        chartArea.datum(this.data)
        .attr('d', area);

        const chartLine = svg.select('.chart path.line');
        chartLine.datum(this.data)
        .attr('d', line);
    }

}
