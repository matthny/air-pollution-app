import { Parameter, PollutionCategory } from '../helpers/common-helper';

export class Warning {
  public parameter: Parameter;
  public warning: PollutionCategory;

  constructor(parameter: Parameter, warning: PollutionCategory) {
    this.parameter = parameter;
    this.warning = warning;
  }
}
