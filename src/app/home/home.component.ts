import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as pkgData from '../../../package.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pkg = pkgData;
  checked1: boolean = true;
  checked2: boolean = false;
  private selectedDate: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  showInfo(summary: string, message: string) {
    this.messageService.add({
      severity: 'info',
      summary: summary,
      detail: message,
    });
  }

  onVersion() {
    const summary = 'Version toggle:';
    if (this.checked2) {
      this.showInfo(summary, 'Showing the current version.');
    } else {
      this.showInfo(summary, 'Hiding the current version.');
    }
  }

  showDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    this.selectedDate = year + '-' + month + '-' + day;
    this.showInfo('Selected Date:', this.selectedDate);
  }
}
