import { LatestMeasurement } from '../models/latest-measurement';
import { LatestPollution } from '../models/latest-pollution';
import { IMeasurementObject } from '../models/utils/interfaces';
import { Wiki } from '../models/wiki';
import { Column } from '../models/column';


export class CommonHelper {
  public static getDistinctDates(dates: Date[]): Date[] {
    return dates
      .map((date: Date) => date.getTime())
      .filter((date: number, i: number, array: number[]) => {
          return array.indexOf(date) === i;
      })
      .map((time: number) => new Date(time));
  }

  public static getFromDateUTC(date: Date): Date {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
      )
    );
  }

  public static getToDateUTC(date: Date): Date {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        // OpenAQ API returns 1 hour more
        22,
        0,
        0
      )
    );
  }

  public static getFormattedHTMLPopup(text: string): string {
    while (text.includes('NO2')
      || text.includes('CO2')
      || text.includes('O3')
      || text.includes('O2')
      || text.includes('SO2')
      || text.includes('C2v')
    ) {
      text = text.replace('NO2', 'NO<sub>2</sub>');
      text = text.replace('CO2', 'CO<sub>2</sub>');
      text = text.replace('O3', 'O<sub>3</sub>');
      text = text.replace('O2', 'O<sub>2</sub>');
      text = text.replace('SO2', 'SO<sub>2</sub>');
      text = text.replace('C2v', 'C<sub>2v</sub>');
    }
    return text;
  }

  public static getFormattedHTMLParameter(text: string): string {
    while (text.includes('o3')
      || text.includes('so2')
      || text.includes('pm10')
      || text.includes('pm25')
      || text.includes('no2')
      || text.includes('co')
      || text.includes('bc')
    ) {
      text = text.replace('o3', 'O<sub>3</sub>');
      text = text.replace('so2', 'SO<sub>2</sub>');
      text = text.replace('no2', 'NO<sub>2</sub>');
      text = text.replace('pm10', 'PM10');
      text = text.replace('pm25', 'PM2.5');
      text = text.replace('co', 'CO');
      text = text.replace('bc', 'BC');
    }
    return text;
  }
}

export interface OpenAQResponse {
    meta: any;
    results: any[];
}

export interface WikiResponse {
  wiki: Wiki;
}

export enum Parameter {
  co = 'co',
  no2 = 'no2',
  o3 = 'o3',
  pm10 = 'pm10',
  pm25 = 'pm25',
  so2 = 'so2',
  bc = 'bc'
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}

export interface SortEvent {
  active: Column;
  direction: SortDirection;
}

export enum PollutionCategory {
  'Good' = 1,
  'Moderate' = 2,
  'UnhealthySensitive' = 3,
  'Unhealthy' = 4,
  'VeryUnhealthy' = 5,
  'Hazardous' = 6,
  'VeryHazardous' = 7,
  'OutOfRange' = 8
}



