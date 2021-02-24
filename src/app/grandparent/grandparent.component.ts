import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Observable} from 'rxjs';
import {DataTypeModel} from '../models/data-type.model';

@Component({
  selector: 'app-grandparent',
  templateUrl: './grandparent.component.html',
  styleUrls: ['./grandparent.component.css']
})
export class GrandparentComponent implements OnInit {
  existingData$: Observable<DataTypeModel[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.existingData$ = this.dataService.getExistingData$();
  }

  updateData($event: DataTypeModel[]) {
  }
}
