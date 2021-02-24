import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';
import {Observable, Subscription} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {TypeModel} from '../models/type.model';
import {DataTypeModel} from '../models/data-type.model';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  @Input()
  data: DataTypeModel[];

  @Output()
  outputData = new EventEmitter<DataTypeModel[]>();

  form = this.fb.group({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.data) {
      const controls = this.fb.array(
        this.data.map(dataModel => this.fb.group({
          length: [{value: dataModel.length, disabled: true}, [
            Validators.required,
            Validators.min(1),
            Validators.pattern('^[0-9]*$')
          ]],
          width: [{value: dataModel.width, disabled: true}, [
            Validators.required,
            Validators.min(1),
            Validators.pattern('[0-9]+')
          ]],
          type: [{ value: dataModel.type, disabled: true}, [Validators.required]]})));

      this.form.addControl('children', controls);
      this.form.valueChanges
        .pipe(
          tap(val => console.log(this.form.valid)),
          filter(val => this.form.valid && val.children),
          map(val => val.children)
        )
        .subscribe(console.log);
    }


  }

  get children(): FormArray {
    return this.form.controls.children as FormArray;
  }

  addChild(): void {
    this.children.disable({emitEvent: false});

    const tempControl = this.fb.group({
      length: [0, [Validators.required]],
      width: [0, [Validators.required]],
      type: [0, [Validators.required]]
    });

    this.children.push(tempControl);
  }

  deleteChild(i: number): void {
    this.children.removeAt(i);
  }

  cancelChild(i: number): void {
    this.deleteChild(i);
  }

  editChild(control: AbstractControl): void {
    control.enable({emitEvent: false});
  }

  onBlurSave(index: number, control: AbstractControl): void {
    console.log(control.value);
    this.children.setControl(index, control);
    this.outputData.emit(control.value);
  }

}
