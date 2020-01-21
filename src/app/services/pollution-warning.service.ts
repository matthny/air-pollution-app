import { Injectable, APP_INITIALIZER } from '@angular/core';
import { PollutionGridElement } from '../models/pollution-grid-element';
import { CommonHelper } from '../helpers/common-helper';

@Injectable({
  providedIn: 'root'
})
export class PollutionWarningService {

  private measurements: PollutionGridElement[] = [];
  private distinctMeasurements: PollutionGridElement[] = [];

  constructor() {
  }

  private initialize(): void {
  }

  public addMeasurements(measurments: PollutionGridElement[]): void {
    this.measurements.push(...measurments);
  }

  public prepareData(): void {
    this.getDistinctMeasurements();
  }

  public getDistinctMeasurements(): void {
    this.measurements.sort((first: PollutionGridElement , second: PollutionGridElement) => {
      return second.date.getTime() - first.date.getTime();
    });

    const distinctDates: Date[] = CommonHelper.getDistinctDates(this.measurements.map(measurement => measurement.date));

    for (const date of distinctDates) {
      for (const measurement of this.measurements) {
        if (date.getTime() === measurement.date.getTime()) {
          this.distinctMeasurements.push(measurement);
          break;
        }
      }
    }
  }
}
