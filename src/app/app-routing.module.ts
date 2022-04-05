import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lbs',
    loadChildren: () => import('./lbs/lbs.module').then(m => m.LbsModule)
  },
  {
    path: '', redirectTo: 'lbs', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
