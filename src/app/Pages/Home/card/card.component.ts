import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserRegisterService } from '../../../services/user-register.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() image!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() link!: string;

  userService = inject(UserRegisterService);
  router = inject(Router)
  isLogin = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.usernameState$.subscribe((e) => {
      this.isLogin = e == null || e == '';
    });
  }

  cancelAnimation() {
    // document.addEventListener('DOMContentLoaded', function () {window.setTimeout(document.querySelector('svg').classList.add('animated'),1000);})
  }

  action(){
    if(this.isLogin){
      this.router.navigate([this.link])
    }
    else{
      this.userService.changeLogInState(true);
    }
  }
}
