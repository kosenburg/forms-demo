import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';
import {Observable, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {TypeModel} from '../models/type.model';
import {DataTypeModel} from '../models/data-type.model';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit , OnDestroy{

  form = this.fb.group({
    children: this.fb.array([])
  });

  data$: Observable<FormArray>;


  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.data$ = this.dataService.getExistingData$()
      .pipe(
        map(val => {
          return val.map(dataModel => this.fb.group({
            length: [{value: dataModel.length, disabled: true}, [Validators.required]],
            width: [{value: dataModel.width, disabled: true}, [Validators.required]],
            type: [{ value: dataModel.type, disabled: true}, [Validators.required]]
          }));
        }),
        map(val => this.fb.array(val)),
        tap(val => this.form.addControl('children', val))
      );
  }

  get children(): FormArray {
    return this.form.controls.children as FormArray;
  }

  addChild(): void {

    this.dataService.addData({
      length: 0,
      width: 0,
      type: TypeModel.BAG
    });

  }

  deleteChild(i: number): void {
    this.dataService.removeData(i);
  }

  cancelChild(i: number): void {
    this.dataService.removeData(i);
  }

  editChild(control: AbstractControl): void {
    control.enable();
  }

  onBlurSave(index: number, control: DataTypeModel): void {
    console.log(control);
    this.dataService.updateData(index, control);
  }

  ngOnDestroy(): void {
  }
}
