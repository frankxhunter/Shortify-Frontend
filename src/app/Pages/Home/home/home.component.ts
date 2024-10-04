import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

  dataCards = [
    {
      image:"App development.gif" ,
      title:"Store All Your Shortened Links",
      description:"With an account, you'll have access to a personal dashboard where all your shortened links are stored securely. You can easily track, manage, and organize your links without ever losing them.",
      link:"/links"
    },
    {
      image:"Memory storage.gif" ,
      title:"Update Your Links Anytime",
      description:"Need to change the destination of a shortened link? With an account, you can edit any link whenever you want, ensuring it always directs to the correct location, all without creating a new link.",
      link:"/links"
    },
    {
      image:"QA engineers.gif" ,
      title:"Track Link Performance",
      description:"Get detailed insights for every link you create. Our platform tracks key metrics like clicks, locations, and devices, giving you full control over link performance and helping you optimize your strategy.",
      link:"/links"
    },
  ]
}
