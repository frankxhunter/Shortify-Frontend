import { Component, inject, ViewEncapsulation } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Url } from '../../../interfaces/url.interface';
import { FetchApiService } from '../../../services/fetch-api.service';
import { API_URLS } from '../../../api-urls';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-table-links',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, NgClass],
  templateUrl: './table-links.component.html',
  styleUrl: './table-links.component.css'
})
export class TableLinksComponent {
  displayedColumns: string[] = ['id', 'Short_Url', 'Original_Url'];
  fetchApiService: FetchApiService = inject(FetchApiService)
  dataSource =  new MatTableDataSource<Url>([]);;
  baseUrl = API_URLS.baseURL
  inputActived = false;


  constructor() {
    //Add 'implements OnInit' to the class.
    this.fetchApiService.getAllUrlsOfUser().subscribe((data: Url[])=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchApiService.stateUrlList$.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource instanceof MatTableDataSource){
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    if(filterValue != null && filterValue!= ""){
      this.inputActived = true
    }
    else{
      this.inputActived = false;
    }
    console.log(filterValue);
    console.log(this.inputActived);
  }
}
