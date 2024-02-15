import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {TeaDescriptionPipe} from "./pipes/tea-description.pipe";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    TeaDescriptionPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    TeaDescriptionPipe,
  ]
})
export class SharedModule { }
