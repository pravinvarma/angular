import { Component, OnInit ,ViewChild} from '@angular/core';
import { CrudService } from '../crud.service';
import {Product} from '../product';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {EditTBComponent} from '../edit-tb/edit-tb.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['field_8','field_1', 'field_3','field_4','field_2', 'field_5','field_6','field_7', 'field_9','action'];
  dataSource:  MatTableDataSource<Product>;
  progress: Boolean = true;
  //dataSource: Product[] = [];
  products: Product[] = [];
  selection = new SelectionModel<Product>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public crudService: CrudService,private _snackBar: MatSnackBar,private dialog: MatDialog) {   }

  ngOnInit() {

    this.crudService.getAll().subscribe((data: Product[])=>{
      this.products = data;
      this.progress = false;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    },
    (error) => {
      this._snackBar.open(error,'', {
        duration:  10000,
      });
      this.progress = false;
    }
    )  
  }
  ngAfterViewInit() {
    
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

   /** Whether the number of selected elements matches the total number of rows. */
   
  openDialog(action,obj) {
    let dialogRef;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';

    dialogConfig.data = {
      selected: obj,
      action: action
    };

    dialogRef = this.dialog.open(EditTBComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.crudService.getAll().subscribe((data: Product[])=>{
        console.log(data);
        this.products = data;
        this.progress = false;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this._snackBar.open(error,'', {
          duration:  10000
        });
        this.progress = false;
      }
      )  
    });
}


  /** The label for the checkbox on the passed row */
  
}
