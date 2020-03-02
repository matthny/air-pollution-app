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

