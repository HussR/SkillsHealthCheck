import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
    ],
    providers: [],
})
export class LayoutModule { }