import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-story-modal',
  templateUrl: './story-modal.component.html'
})
export class StoryModalComponent {
  videoUrl: string;
  preferences: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.videoUrl = data.url;
    this.preferences = data.preferences;
  }

  accept() {

  }
}

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html'
})
export class StoryListComponent {
  title = 'Story List';

  videos: Array<any> = [{
    title: 'First Story',
    url: '/assets/videos/methadone.mov',
    preferences: {}
  }, {
    title: 'Second Story',
    url: '/assets/videos/naltrexone.mov',
    preferences: {}
  }];

  constructor (
    private dialog: MatDialog
  ) {}

  showVideo(video) {
    this.dialog.open(StoryModalComponent, {
      data: video
    });
  }
}
