
import { UploadService } from 'src/app/services/FileUploadService/file-upload.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent {
  selectedFile: File | null = null;
  uploadSuccess = false;
  uploadFailure = false;

  constructor(
    private uploadService: UploadService,
    private snackBar: MatSnackBar
  ) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.uploadSuccess = false;
    this.uploadFailure = false;
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile).subscribe(
        () => {
          this.uploadSuccess = true;
          this.snackBar.open('File uploaded successfully.', 'Close', {
            duration: 3000,
          });
          // Handle successful upload here
        },
        (error: string) => {
          this.uploadFailure = true;
          this.snackBar.open(error, 'Close', {
            duration: 3000,
            panelClass: ['mat-snack-bar-error']
          });
          // Handle error here
        }
      );
    }
  }
}
