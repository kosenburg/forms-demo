import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {DataTypeModel} from '../models/data-type.model';
import {TypeModel} from '../models/type.model';
import {Data} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: DataTypeModel[] = [
    {
      length: 10,
      width: 11,
      type: TypeModel.BAG
    },
    {
      length: 12,
      width: 5,
      type: TypeModel.TUPPERWARE
    }
  ];

  private behSub = new BehaviorSubject<DataTypeModel[]>(this.data);

  constructor() { }


  getExistingData$(): Observable<DataTypeModel[]> {
    return this.behSub.asObservable();
  }

  addData(data: DataTypeModel): void {
    this.data.push(data);
    this.behSub.next(this.data);
  }

  removeData(index: number): void {
    this.data.splice(index, 1);
    this.behSub.next(this.data);
  }

  updateData(index: number, control: DataTypeModel): void {
    this.data[index] = control;
  }
}
