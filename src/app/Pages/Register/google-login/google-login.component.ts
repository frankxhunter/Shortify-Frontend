import { Component, OnInit, ElementRef, ViewChild, NgZone, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-google-login',
  imports: [],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.css'
})
export class GoogleLoginComponent {

  
  @ViewChild('googleBtn', { static: true }) googleBtn!: ElementRef;
  @Output() loginSuccess = new EventEmitter<string>();

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' }
    );
  }

  handleCredentialResponse(response: any) {
    const token = response.credential;
    console.log('Google token:', token);
    this.ngZone.run(() => this.loginSuccess.emit(token)); // emit token to parent component
  }
}
