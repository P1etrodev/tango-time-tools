import * as XLSX from 'xlsx';

import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  iconoirFloppyDisk,
  iconoirPause,
  iconoirPlay,
  iconoirText,
  iconoirTextSquare,
} from '@ng-icons/iconoir';

import { ClockService } from '../../_services/clock/clock.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'clock-controls',
  imports: [NgIcon, FormsModule],
  templateUrl: './clock-controls.component.html',
  styleUrl: './clock-controls.component.scss',
  providers: [
    provideIcons({
      iconoirPlay,
      iconoirPause,
      iconoirFloppyDisk,
      iconoirText,
      iconoirTextSquare,
    }),
    provideNgIconsConfig({ strokeWidth: '2', size: '1.25rem' }),
  ],
})
export class ClockControlsComponent {
  clockService = inject(ClockService);
  fileFormat: 'json' | 'xlsx' | 'csv' = 'xlsx';
  get availableFormats() {
    return ['xlsx', 'csv', 'json'];
  }
  downloadFile(): void {
    switch (this.fileFormat) {
      case 'json':
        this.downloadJSON();
        break;
      case 'csv':
        this.downloadCSV();
        break;
      case 'xlsx':
        this.downloadExcel();
        break;
    }
  }

  private downloadJSON(): void {
    const jsonStr: string = JSON.stringify(this.clockService.records, null, 2);
    this.triggerDownload(jsonStr, 'archivo.json', 'application/json');
  }

  private downloadCSV(): void {
    const header = Object.keys(this.clockService.records[0]).join(',');
    const rows = this.clockService.records.map((row) =>
      Object.values(row)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(',')
    );
    const csvContent = [header, ...rows].join('\r\n');
    this.triggerDownload(csvContent, 'archivo.csv', 'text/csv');
  }

  private downloadExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.clockService.records
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: ArrayBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    this.triggerBlobDownload(blob, 'archivo.xlsx');
  }

  private triggerDownload(
    content: string,
    fileName: string,
    mimeType: string
  ): void {
    const blob = new Blob([content], { type: mimeType });
    this.triggerBlobDownload(blob, fileName);
  }

  private triggerBlobDownload(blob: Blob, fileName: string): void {
    const url: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }
}
