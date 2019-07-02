import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TerminatedTasksPage } from './terminated-tasks';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TerminatedTasksPage,
  ],
  imports: [
    IonicPageModule.forChild(TerminatedTasksPage),
    PipesModule
  ],
})
export class TerminatedTasksPageModule {}
