import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormUrlComponent } from './form-url/form-url.component';
import { OutputUrlComponent } from "./output-url/output-url.component";
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormUrlComponent, OutputUrlComponent, ErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Shortify';
  fetchData = "";
  errorConnection = false

  fetchDataRefresh(data: string){
    this.errorConnection = false;
    this.fetchData = ""
    setTimeout(()=>{
      this.fetchData = data;

    },10)

  }

  errorFetch(data: boolean){
    this.fetchData = "";
    this.errorConnection = data;
  }
}
