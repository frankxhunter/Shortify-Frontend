import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Register } from '../../interfaces/register.interface';

@Component({
    selector: 'app-link-register-details',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        NgClass,
    ],
    templateUrl: './link-register-details.component.html',
    styleUrl: './link-register-details.component.css'
})
export class LinkRegisterDetailsComponent {
  @Input() registers!: Register[];
  displayedColumns: string[] = ['IP', 'Browser', 'OS', 'Architecture', "Date"];
  dataSource = new MatTableDataSource<Register>([]);
  inputActived = false;
  textCopied = false;

  constructor(){
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.registers);
    this.dataSource = new MatTableDataSource(this.registers);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource instanceof MatTableDataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    if (filterValue != null && filterValue != '') {
      this.inputActived = true;
    } else {
      this.inputActived = false;
    }
    console.log(filterValue);
    console.log(this.inputActived);
  }

  copyText(text: string) {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.textCopied = true;
        setTimeout(() => {
          this.textCopied = false;
        }, 2000);
      });
    }
  }
}
