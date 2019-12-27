import { LatestMeasurement } from '../models/latest-measurement';
import { LatestPollution } from '../models/latest-pollution'


export class CommonHelper {

    public static getLatestPollutionGridDataSource(measurements: LatestMeasurement[]): pollutionGridElement[] {

        const latestPollutionGridDataSource: pollutionGridElement[] = []

        const latestPollution: pollutionGridElement = {
          bc: null,
          co: null,
          no2: null, 
          o3: null, 
          pm10: null, 
          pm25: null, 
          so2: null 
        }
    
        measurements.forEach((measurement: LatestMeasurement) => {
    
          if (measurement.parameter === 'bc') { 
            latestPollution.bc = measurement 
          }
    
          if (measurement.parameter === 'co') { 
            latestPollution.co = measurement 
          }
    
          if (measurement.parameter === 'no2') { 
            latestPollution.no2 = measurement 
          }
    
          if (measurement.parameter === 'o3') { 
            latestPollution.o3 = measurement 
          }     
          
          if (measurement.parameter === 'pm10') { 
            latestPollution.pm10 = measurement 
          }
          
          if (measurement.parameter === 'pm25') { 
            latestPollution.pm25 = measurement 
          }
          
          if (measurement.parameter === 'so2') { 
            latestPollution.so2 = measurement 
          }
        })

        latestPollutionGridDataSource.push(latestPollution);
    
        return latestPollutionGridDataSource;
      }
    
      public static getLatestPollutionGridColumns(dataSource: pollutionGridElement[]): any[] {
    
        const latestPollutionGridColumns: any[] = []

        dataSource.forEach((element: pollutionGridElement)  => {
          if (element.bc != null) { 
            latestPollutionGridColumns.push('bc');
          }
    
          if (element.co != null) { 
            latestPollutionGridColumns.push('co');
          }
    
          if (element.no2 != null) { 
            latestPollutionGridColumns.push('no2');
          }
    
          if (element.o3 != null) { 
            latestPollutionGridColumns.push('o3');
          }
    
          if (element.pm10 != null) { 
            latestPollutionGridColumns.push('pm10');
          }
    
          if (element.pm25 != null) { 
            latestPollutionGridColumns.push('pm25');
          }
    
          if (element.so2 != null) { 
            latestPollutionGridColumns.push('so2');
          }
    
        })
        return latestPollutionGridColumns;
    }
}

export type OpenAQResponse = {
    meta: any
    results: any[]
}


export type pollutionGridElement = {
    bc: LatestMeasurement
    co: LatestMeasurement
    no2: LatestMeasurement
    o3: LatestMeasurement
    pm10: LatestMeasurement
    pm25: LatestMeasurement
    so2: LatestMeasurement
  }