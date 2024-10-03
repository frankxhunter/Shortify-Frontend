import { Routes } from '@angular/router';
import {LinksComponent} from  "./Pages/LinksPage/links/links.component"
import { LinkRegisterDetailsComponent } from './Pages/link-register-details/link-register-details.component';
import { registerDetailsResolver } from './Resolver/register-details.resolver';


export const routes: Routes = [
    {path: "links", component: LinksComponent},
    {path: "links/logs/:id", component: LinkRegisterDetailsComponent, resolve: {registers: registerDetailsResolver}},
    {path: "**", redirectTo: '' }
];
