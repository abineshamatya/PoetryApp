import { Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SliderComponent } from './layout/header/slider/slider.component';
import { PoemComponent } from './poem/poem.component';

export const appRoutes: Routes = [
    {
        path: 'poem',
        component: PoemComponent,
    },
    {
        path: '',
        redirectTo: '/poem',
        pathMatch: 'full'
    }
    ,
    {
        path: '**',
        redirectTo: 'poem'
    }
];