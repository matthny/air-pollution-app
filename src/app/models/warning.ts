import { Parameter } from '../helpers/common-helper';

export class Warning {
  public parameter: Parameter;
  public warning: string;

  constructor(parameter: Parameter, warning: string) {
    this.parameter = parameter;
    this.warning = warning;
  }
}