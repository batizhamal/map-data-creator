import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LbsComponent } from './lbs.component';
import { LbsRoutingModule } from './login-routing.module';
import { AddBasestationComponent } from './add-basestation/add-basestation.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { HttpClientModule } from '@angular/common/http';
import { BasestationsComponent } from './basestations/basestations.component';
import { LbsService } from './lbs.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

@NgModule({
	declarations: [LbsComponent, AddBasestationComponent, BasestationsComponent, ListComponent],
	imports: [CommonModule, LbsRoutingModule, NgxMapboxGLModule, HttpClientModule, FormsModule, ReactiveFormsModule],
	providers: [LbsService]
})
export class LbsModule {}
