import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../services/cv.service';
import { CvData } from '../../models/cv.model';

@Component({
  selector: 'app-cv-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-preview.component.html',
  styleUrls: ['./cv-preview.component.scss']
})
export class CvPreviewComponent {

  cvService = inject(CvService);

  get cv(): CvData { return this.cvService.cv(); }
  get activeProfile() {
    return this.cv.profiles.find(p => p.id === this.cv.activeProfileId);
  }

  get labels() {
  return this.cvService.lang() === 'en'
    ? this.cvService.labelsEn
    : this.cvService.labelsEs;
}
}
