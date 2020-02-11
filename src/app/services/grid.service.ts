import { Injectable } from '@angular/core';
import { IMeasurementObject } from '../models/utils/interfaces';
import { PollutionGridElement } from '../models/pollution-grid-element';
import { CommonHelper, Parameter } from '../helpers/common-helper';
import { Column } from '../models/column';
import { Measurement } from '../models/measurement';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor() {
  }

  public getPollutionGridDataSource(measurements: IMeasurementObject[]): PollutionGridElement[] {
    const distinctDates: Date[] = CommonHelper.getDistinctDates(measurements.map(measurment => measurment.getDate()));
    const latestPollutionGridDataSource: PollutionGridElement[] = this.getPollutionGridElementsForLocation(distinctDates, measurements);

    latestPollutionGridDataSource.sort((first: PollutionGridElement , second: PollutionGridElement) => {
      return second.date.getTime() - first.date.getTime();
    });

    return latestPollutionGridDataSource;
  }

  public getPollutionGridElementsForLocation(dates: Date[], measurements: IMeasurementObject[]): PollutionGridElement[] {
    const elements: PollutionGridElement[] = [];

    dates.forEach((date: Date) => {
      const pollutionGridElement: PollutionGridElement = new PollutionGridElement();

      measurements.forEach((measurement: IMeasurementObject) => {
        if (measurement.getDate().getTime() === date.getTime()) {
          pollutionGridElement.date = date;

          if (measurement.getParameter() === Parameter.bc) {
            pollutionGridElement.bc = measurement;
          }

          if (measurement.getParameter() === Parameter.co) {
            pollutionGridElement.co = measurement;
          }

          if (measurement.getParameter() === Parameter.no2) {
            pollutionGridElement.no2 = measurement;
          }

          if (measurement.getParameter() === Parameter.o3) {
            pollutionGridElement.o3 = measurement;
          }

          if (measurement.getParameter() === Parameter.pm10) {
            pollutionGridElement.pm10 = measurement;
          }

          if (measurement.getParameter() === Parameter.pm25) {
            pollutionGridElement.pm25 = measurement;
          }

          if (measurement.getParameter() === Parameter.so2) {
            pollutionGridElement.so2 = measurement;
          }
        }

      });
      elements.push(pollutionGridElement);


    });

    return elements;
  }

  public getPollutionGridElementsForCountry(parameter: Parameter , measurements: Measurement[]): PollutionGridElement[] {
    return measurements.map((measurement: Measurement): PollutionGridElement => {
      const result: PollutionGridElement = new PollutionGridElement();

      result.date = measurement.getDate();
      result.city = measurement.city;
      result.country = measurement.country;
      result[parameter] = measurement;

      return result;
    });
  }



  public getPollutionGridAvailableColumns(dataSource: PollutionGridElement[]): any[] {

    const pollutionGridColumns: any[] = [];

    dataSource.forEach((element: PollutionGridElement)  => {
      if (element.date != null && !pollutionGridColumns.includes(Column.date)) {
        pollutionGridColumns.push(Column.date);
      }

      if (element.pm10 != null && !pollutionGridColumns.includes(Column.pm10)) {
        pollutionGridColumns.push(Column.pm10);
      }

      if (element.pm25 != null && !pollutionGridColumns.includes(Column.pm25)) {
        pollutionGridColumns.push(Column.pm25);
      }

      if (element.bc != null && !pollutionGridColumns.includes(Column.bc)) {
        pollutionGridColumns.push(Column.bc);
      }

      if (element.co != null && !pollutionGridColumns.includes(Column.co)) {
        pollutionGridColumns.push(Column.co);
      }

      if (element.no2 != null && !pollutionGridColumns.includes(Column.no2)) {
        pollutionGridColumns.push(Column.no2);
      }

      if (element.o3 != null && !pollutionGridColumns.includes(Column.o3)) {
        pollutionGridColumns.push(Column.o3);
      }

      if (element.so2 != null && !pollutionGridColumns.includes(Column.so2)) {
        pollutionGridColumns.push(Column.so2);
      }

      if (element.city != null && !pollutionGridColumns.includes(Column.city)) {
        pollutionGridColumns.push(Column.city);
      }

    });

    return pollutionGridColumns;
}

  public getPollutionGridColumns(moduleColumns: Column[], dataSource: PollutionGridElement[]): Column[] {
    const availableColumns = this.getPollutionGridAvailableColumns(dataSource);

    return availableColumns.filter((column: Column) => moduleColumns.includes(column));
  }


}
