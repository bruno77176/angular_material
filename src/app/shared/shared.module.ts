import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule {}
