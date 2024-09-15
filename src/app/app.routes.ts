import { Routes } from '@angular/router';
import {LinksComponent} from  "./links/links.component"


export const routes: Routes = [
    {path: "links", component: LinksComponent},
    {path: "**", redirectTo: '' }
];
