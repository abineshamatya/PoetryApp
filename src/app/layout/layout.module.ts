import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/shared/services/common.service';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './header/slider/slider.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SliderComponent
    ],
    imports: [
        CommonModule,
        CarouselModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    exports: [
        HeaderComponent
    ],
    providers: [CommonService],
})
export class LayoutModule { }
