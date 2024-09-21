import { Component, inject, ViewEncapsulation } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Url } from '../interfaces/url.interface';
import { FetchApiService } from '../services/fetch-api.service';


@Component({
  selector: 'app-links',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LinksComponent {

  displayedColumns: string[] = ['id', 'Short_Url', 'Original_Url'];
  fetchApiService: FetchApiService = inject(FetchApiService)
  dataSource =  new MatTableDataSource<Url>([]);;
  baseUrl = ""


  constructor() {
    //Add 'implements OnInit' to the class.
    this.baseUrl = window.location.origin;
    this.fetchApiService.getAllUrlsOfUser().subscribe((data: Url[])=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource instanceof MatTableDataSource){
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

}
