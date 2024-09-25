import { Component, inject, ViewEncapsulation } from '@angular/core';
import { UserRegisterService } from '../../../services/user-register.service';
import { TableLinksComponent } from '../table-links/table-links.component';
import { RequireAutheticationErrorComponent } from '../../require-authetication-error/require-authetication-error.component';


@Component({
  selector: 'app-links',
  standalone: true,
  imports: [TableLinksComponent, RequireAutheticationErrorComponent],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LinksComponent {
registerUserService = inject(UserRegisterService)

username: string | null = null;
 
ngOnInit(): void {
  this.registerUserService.usernameState$.subscribe(data=>{
    this.username = data;
  })
}
}
