import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Chart {
    public name: string;
    public title: string;
    public caption: string;
    public attributes: Array<string>;
}


@Injectable()
export class GridService {

    private charts: Array<Chart>;

    constructor(
        private httpClient: HttpClient
    ) {}

    private load(): Promise<boolean> {
        if (this.charts) {
            return Promise.resolve(true);
        } else {
            return new Promise((resolve) => {
                this.httpClient.get('assets/charts.json')
                .subscribe((data: any) => {
                    this.charts = [];

                    const order: Array<string> = data['order'];
                    order.forEach((name) => {
                        if (data[name]) {
                            this.loadChart(name, data[name]);
                        }
                    });

                    resolve(true);
                });
            });
        }
    }

    private loadChart(name: string, data: any) {
        const chart = new Chart();
        chart.name = name;
        chart.title = data['title'];
        chart.caption = data['caption'];
        chart.attributes = data['attributes'];

        this.charts.push(chart);
    }

    public get(name: string): Promise<Chart> {
        return this.load()
        .then(() => {
            const foundChart = this.charts.find((chart) => {
                return chart.name === name;
            });
            if (foundChart) {
                return Promise.resolve(foundChart);
            } else {
                return Promise.reject('Chart not found');
            }
        });
    }

}
