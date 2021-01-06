import {Component, OnInit} from '@angular/core';
import {CrudService} from '../crud.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  productForm: FormGroup;

  ngOnInit() {
    this.productForm = this.fb.group({
      field_4: [''],
      field_2: ['TEST'],
      field_8: [''],
      field_1: [''],
      field_3: [''],
      field_6: [''],
      field_5: [''],
      field_9: [''],
      field_7: ['']
    });
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService
  ) {
  }

  submitForm() {
    this.crudService.create(this.productForm.value).subscribe(res => {
      console.log('Added!');
      this.router.navigateByUrl('home/');
    });
  }

}
