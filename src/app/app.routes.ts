import { Routes } from '@angular/router';
import {LinksComponent} from  "./Pages/LinksPage/links/links.component"


export const routes: Routes = [
    {path: "links", component: LinksComponent},
    {path: "**", redirectTo: '' }
];
