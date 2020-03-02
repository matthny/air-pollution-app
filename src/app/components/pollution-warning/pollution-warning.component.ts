import { Component, OnInit, Input } from '@angular/core';
import { PollutionCategory } from 'src/app/helpers/common-helper';
import { Warning } from 'src/app/models/warning';

@Component({
  selector: 'app-pollution-warning',
  templateUrl: './pollution-warning.component.html',
  styleUrls: ['./pollution-warning.component.scss']
})

export class PollutionWarningComponent implements OnInit {

  @Input() warnings: Warning[];

  constructor() { }

  ngOnInit() {
  }
}
