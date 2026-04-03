import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CvExperience } from '../../models/cv.model';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-experience-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './experience-editor.component.html',
  styleUrls: ['./experience-editor.component.scss']
})
export class ExperienceEditorComponent implements OnInit {
  @Input() field: 'experiences' | 'enterpriseExperiences' = 'experiences';

  cvService = inject(CvService);

  expandedId: number | null = null;
  dragFromIdx: number | null = null;
  dragOverIdx: number | null = null;

  get items(): CvExperience[] {
    return this.cvService.cv()[this.field];
  }

  ngOnInit() {}

  toggle(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  getBulletsText(exp: CvExperience): string {
    return exp.bullets.join('\n');
  }

  updateBullets(exp: CvExperience, value: string) {
    this.updateField(exp.id, 'bullets', value.split('\n'));
  }

  updateField(id: number, key: keyof CvExperience, value: any) {
    const updated = this.items.map(x => x.id === id ? { ...x, [key]: value } : x);
    this.cvService.update({ [this.field]: updated } as any);
  }

  remove(id: number) {
    const updated = this.items.filter(x => x.id !== id);
    this.cvService.update({ [this.field]: updated } as any);
    if (this.expandedId === id) this.expandedId = null;
  }

  add() {
    const newExp: CvExperience = {
      id: Date.now(),
      company: 'Nueva Empresa',
      companyUrl: '',
      location: 'Ciudad',
      role: 'Cargo / Rol',
      period: 'Mes Año - Mes Año',
      bullets: ['Descripción del logro o responsabilidad principal.'],
    };
    const updated = [...this.items, newExp];
    this.cvService.update({ [this.field]: updated } as any);
    this.expandedId = newExp.id;
  }

  // ── Drag & Drop ──────────────────
  onDragStart(idx: number) { this.dragFromIdx = idx; }
  onDragOver(e: DragEvent, idx: number) { e.preventDefault(); this.dragOverIdx = idx; }
  onDrop(idx: number) {
    if (this.dragFromIdx === null || this.dragFromIdx === idx) {
      this.dragFromIdx = null; this.dragOverIdx = null; return;
    }
    const arr = [...this.items];
    const [moved] = arr.splice(this.dragFromIdx, 1);
    arr.splice(idx, 0, moved);
    this.cvService.update({ [this.field]: arr } as any);
    this.dragFromIdx = null;
    this.dragOverIdx = null;
  }
  onDragEnd() { this.dragFromIdx = null; this.dragOverIdx = null; }
}
