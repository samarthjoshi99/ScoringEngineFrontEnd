import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(file: File): Observable<boolean> {
    return new Observable<boolean> ((observer) => {
      const allowedTypes = ['application/pdf'];

      if (!allowedTypes.includes(file.type)) {
        observer.error('Invalid file type. Only PDF files are allowed.');
        return;
      }

      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        observer.next(true);
        observer.complete();
      };

      reader.onerror = (event: ProgressEvent<FileReader>) => {
        observer.error('Error reading file.');
      };

      reader.readAsDataURL(file);
    });
  }
}
