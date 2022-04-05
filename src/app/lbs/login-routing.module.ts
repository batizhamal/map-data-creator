import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBasestationComponent } from './add-basestation/add-basestation.component';
import { BasestationsComponent } from './basestations/basestations.component';
import { LbsComponent } from './lbs.component';

const routes: Routes = [
    { path: '', component: BasestationsComponent},
    { path: 'basestations', component: BasestationsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LbsRoutingModule { }
