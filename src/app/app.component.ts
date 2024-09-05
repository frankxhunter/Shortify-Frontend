import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormUrlComponent } from './form-url/form-url.component';
import { OutputUrlComponent } from "./output-url/output-url.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormUrlComponent, OutputUrlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Shortify';
  fetchData = "";

  fetchDataRefresh(data: string){
    this.fetchData = ""
    setTimeout(()=>{
      this.fetchData = data;

    },10)

  }
}
