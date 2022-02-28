import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DetailComponent } from './detail/detail.component';
import { PoemComponent } from './poem.component';

@NgModule({
    declarations: [
        PoemComponent,
        DetailComponent
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatTooltipModule,
        MatIconModule,
        FlexLayoutModule
    ],
    exports: [
        PoemComponent
    ],
    // schemas: [NO_ERRORS_SCHEMA],
    providers: [
    ],
})
export class PoemModule {
}
