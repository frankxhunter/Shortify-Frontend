import { NgClass } from '@angular/common';
import { Component, inject, Inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FetchApiService } from '../../services/fetch-api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-editable-button',
  standalone: true,
  imports: [ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './editable-button.component.html',
  styleUrl: './editable-button.component.css',
})
export class EditableButtonComponent {
  @Input() data = '';
  @Input() id = 0
  form: FormGroup;
  editMode = false;
  error = '';
  private timeOut: any = null;
  load = false;

  fetchApiService: FetchApiService = inject(FetchApiService)

  constructor(private _formBuilder: FormBuilder) {
    this.form = _formBuilder.group({
      dataForm: [
        '',
        [
          Validators.required,
          Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
        ],
      ],
    });
  }

  changeEditMode(value: boolean) {
    this.editMode = value;
  }

  submitForm() {
    if (this.form.get('dataForm')?.errors) {
      this.getErrorMessage();
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.error = '';
      }, 2000);
    } else {
      this.load = true
      this.fetchApiService.updateOriginalUrl(this.id, this.form.value.dataForm).subscribe((data)=>{
        this.fetchApiService.refreshList()
        this.data = this.form.value.dataForm;
        this.load = false;
        this.changeEditMode(false);
        console.log(data);
      })
    }
  }

  private getErrorMessage() {
    if (this.form.hasError('required', ['dataForm'])) {
      this.error = 'The url is required';
    }
    else if(this.form.hasError('pattern', ['dataForm'])){
      this.error = "The format is invalid"
    } else this.error = '';
  }
}
