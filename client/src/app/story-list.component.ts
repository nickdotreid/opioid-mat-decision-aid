import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PreferencesService } from './preferences.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story-modal',
  templateUrl: './story-modal.component.html'
})
export class StoryModalComponent {
  videoUrl: string;
  preferences: any;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private preferencesService: PreferencesService,
    private router: Router
  ) {
    this.videoUrl = data.url;
    this.preferences = data.preferences;
  }

  accept() {
    this.preferencesService.updatePreferences(this.preferences);
    this.router.navigateByUrl('medications');
    this.dialogRef.close();
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
    preferences: {
      widthdrawlSymptoms: 'lessSevere',
      initiation: 'startRightAway'
    }
  }, {
    title: 'Second Story',
    url: '/assets/videos/naltrexone.mov',
    preferences: {
      widthdrawlSymptoms: 'headaches',
      initiation: 'detoxThenINJ'
    }
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
