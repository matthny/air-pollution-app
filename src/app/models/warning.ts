import { Parameter, PollutionCategory } from '../helpers/common-helper';

export class Warning {
  public parameter: Parameter;
  public warning: PollutionCategory;

  constructor(parameter: Parameter, warning: PollutionCategory) {
    this.parameter = parameter;
    this.warning = warning;
  }

  private getWarningMessage(): string {
    if (this.warning === PollutionCategory.Good) {
      return 'Good';
    }

    if (this.warning === PollutionCategory.Moderate) {
      return 'Moderate';
    }

    if (this.warning === PollutionCategory.UnhealthySensitive) {
      return 'Unhealthy for Sensitive Groups';
    }

    if (this.warning === PollutionCategory.Unhealthy) {
      return 'Unhealthy';
    }

    if (this.warning === PollutionCategory.VeryUnhealthy) {
      return 'Very unhealthy';
    }

    if (this.warning === PollutionCategory.Hazardous) {
      return 'Hazardous';
    }

    if (this.warning === PollutionCategory.VeryHazardous) {
      return 'Very hazardous';
    }

    if (this.warning === PollutionCategory.OutOfRange) {
      return 'Out of range';
    }
  }
}
