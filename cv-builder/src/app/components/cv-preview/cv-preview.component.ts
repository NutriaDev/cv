import { AfterViewInit, Component, effect, ElementRef, inject } from '@angular/core';
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
export class CvPreviewComponent implements AfterViewInit {

  cvService = inject(CvService);
  private el = inject(ElementRef);

    constructor() {
    effect(() => {
      this.cvService.lang();
      this.cvService.cv();
      setTimeout(() => this.fixPageBreaks(), 100);
    });
  }

  get cv(): CvData { return this.cvService.cv(); }
  get activeProfile() {
    return this.cv.profiles.find(p => p.id === this.cv.activeProfileId);
  }

  get labels() {
  return this.cvService.lang() === 'en'
    ? this.cvService.labelsEn
    : this.cvService.labelsEs;
}

ngAfterViewInit(): void {
    // Espera a que Angular termine de renderizar
    setTimeout(() => this.fixPageBreaks(), 100);
  }

  private fixPageBreaks(): void {
    const PAGE_HEIGHT_PX = 1122; // 297mm a 96dpi
    const sections = this.el.nativeElement.querySelectorAll('.cv-section');
    const container = this.el.nativeElement.querySelector('#cv-content');
    if (!container) return;

    const containerTop = container.getBoundingClientRect().top + window.scrollY;

    sections.forEach((section: HTMLElement) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - containerTop;
      const pageNumber = Math.floor(sectionTop / PAGE_HEIGHT_PX);
      const pageEnd = (pageNumber + 1) * PAGE_HEIGHT_PX;

      // Si el título (aprox 30px) cae en los últimos 40px de la página
      // o si el título empieza justo al borde
      const titleBottom = sectionTop + 40; // título + divider ≈ 40px
      if (titleBottom > pageEnd) {
        // Empujamos la sección a la siguiente página
        const gap = pageEnd - sectionTop + 8;
        section.style.marginTop = `${gap}px`;
      }
    });
  }
}
