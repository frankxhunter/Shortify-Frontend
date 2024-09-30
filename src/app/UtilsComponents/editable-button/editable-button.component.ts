import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-editable-button',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './editable-button.component.html',
  styleUrl: './editable-button.component.css',
})
export class EditableButtonComponent {
  @Input() data = '';
  form: FormGroup;
  editMode = false;
  error = '';
  private timeOut: any = null;

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
    console.log(this.form);
    if (this.form.get('dataForm')?.errors) {
      console.log('Is not valid');
      this.getErrorMessage();
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.error = '';
      }, 2000);
    } else {
      this.data = this.form.value.dataForm;
      console.log(this.data);
      this.changeEditMode(false);
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
