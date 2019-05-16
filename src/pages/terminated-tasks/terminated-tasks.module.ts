import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TerminatedTasksPage } from './terminated-tasks';

@NgModule({
  declarations: [
    TerminatedTasksPage,
  ],
  imports: [
    IonicPageModule.forChild(TerminatedTasksPage),
  ],
})
export class TerminatedTasksPageModule {}
