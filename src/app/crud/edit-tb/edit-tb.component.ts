import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inject }   from '@angular/core'
import { CrudService } from '../crud.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-edit-tb',
  templateUrl: './edit-tb.component.html',
  styleUrls: ['./edit-tb.component.scss']
}) 

export class EditTBComponent implements OnInit {
  productForm: FormGroup;
    form: FormGroup;
    field_9:string;
    local_data: any;
    action:string;
    
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditTBComponent>,
        public crudService: CrudService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data) {
          if(data.selected){
          this.local_data = JSON.parse(JSON.stringify(data.selected));
          } else {
            this.local_data = {}
          }
          this.action = data.action;
       // this.field_9 = data.selected[0].field_1;
    }

    ngOnInit() {
  
    }
    

    save() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }
    submitForm() {
      if(this.action === 'add'){
      this.crudService.create(this.local_data).subscribe(res => {
        console.log('Added!');
        this.close();
    },   (error) => {
      this._snackBar.open(error,'', {
        duration:  10000,
      });
      this.close();
    },
    ()=>{
      this.close();
    })}
    if(this.action === 'Update'){
      this.crudService.update(this.local_data).subscribe(res => {
        console.log('updated!');
        this.close();
    },   (error) => {
      this._snackBar.open(error,'', {
        duration:  10000,
      });
      this.close();
    },
    ()=>{
      this.close();
    })}
    if(this.action === 'Delete'){
      this.crudService.delete(this.local_data.field_8).subscribe(res => {
        console.log('deleted!');
        this.close();
    },   (error) => {
      this._snackBar.open(error,'', {
        duration:  10000,
      });
      this.close();
    },
    ()=>{
      this.close();
    })}
  }
}
