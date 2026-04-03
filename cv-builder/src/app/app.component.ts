import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CvService } from './services/cv.service';
import { CvData, CvProfile, CvSkillCategory, CvEducation, CvLanguage, CvSoftSkill } from './models/cv.model';
import { CvPreviewComponent } from './components/cv-preview/cv-preview.component';
import { ExperienceEditorComponent } from './components/experience-editor/experience-editor.component';

declare var html2pdf: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CvPreviewComponent, ExperienceEditorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cvService = inject(CvService);

  activeSection = 'header';
  translating = false;
  toast: { msg: string; ok: boolean } | null = null;

  sections = [
    { key: 'header',     label: 'Encabezado',    icon: '◈' },
    { key: 'profile',    label: 'Perfil / Stack', icon: '◉' },
    { key: 'experience', label: 'Experiencia',    icon: '◆' },
    { key: 'enterprise', label: 'Empresarial',    icon: '◇' },
    { key: 'skills',     label: 'Tech Skills',    icon: '⬡' },
    { key: 'education',  label: 'Educación',      icon: '◈' },
    { key: 'additional', label: 'Habilidades +',  icon: '◎' },
  ];

  get cv(): CvData { return this.cvService.cv(); }
  Math = Math;

  updateHeader(field: string, value: string) {
    this.cvService.update({ header: { ...this.cv.header, [field]: value } });
  }

  get activeProfile() {
    return this.cv.profiles.find(p => p.id === this.cv.activeProfileId);
  }

  addProfile() {
    const newP: CvProfile = { id: Date.now(), name: 'Nuevo Perfil', text: '' };
    this.cvService.update({ profiles: [...this.cv.profiles, newP], activeProfileId: newP.id });
  }

  removeProfile(id: number) {
    const profiles = this.cv.profiles.filter(p => p.id !== id);
    const activeProfileId = profiles[0]?.id ?? 0;
    this.cvService.update({ profiles, activeProfileId });
  }

  updateProfile(id: number, field: keyof CvProfile, value: string) {
    const profiles = this.cv.profiles.map(p => p.id === id ? { ...p, [field]: value } : p);
    this.cvService.update({ profiles });
  }

  addSkill() {
    const s: CvSkillCategory = { id: Date.now(), category: 'Nueva Categoría', skills: '' };
    this.cvService.update({ technicalSkills: [...this.cv.technicalSkills, s] });
  }

  removeSkill(id: number) {
    this.cvService.update({ technicalSkills: this.cv.technicalSkills.filter(s => s.id !== id) });
  }

  updateSkill(id: number, field: keyof CvSkillCategory, value: string) {
    const technicalSkills = this.cv.technicalSkills.map(s => s.id === id ? { ...s, [field]: value } : s);
    this.cvService.update({ technicalSkills });
  }

  addEdu() {
    const e: CvEducation = { id: Date.now(), institution: 'Institución', location: 'Ciudad', degree: 'Título / Programa', period: 'Año - Año' };
    this.cvService.update({ education: [...this.cv.education, e] });
  }

  removeEdu(id: number) {
    this.cvService.update({ education: this.cv.education.filter(e => e.id !== id) });
  }

  updateEdu(id: number, field: keyof CvEducation, value: string) {
    const education = this.cv.education.map(e => e.id === id ? { ...e, [field]: value } : e);
    this.cvService.update({ education });
  }

  addLang() {
    const l: CvLanguage = { id: Date.now(), language: 'Idioma', level: 'Nivel' };
    this.cvService.update({ languages: [...this.cv.languages, l] });
  }

  removeLang(id: number) {
    this.cvService.update({ languages: this.cv.languages.filter(l => l.id !== id) });
  }

  updateLang(id: number, field: keyof CvLanguage, value: string) {
    const languages = this.cv.languages.map(l => l.id === id ? { ...l, [field]: value } : l);
    this.cvService.update({ languages });
  }

  addSoft() {
    const s: CvSoftSkill = { id: Date.now(), skill: 'Nueva habilidad' };
    this.cvService.update({ softSkills: [...this.cv.softSkills, s] });
  }

  removeSoft(id: number) {
    this.cvService.update({ softSkills: this.cv.softSkills.filter(s => s.id !== id) });
  }

  updateSoft(id: number, value: string) {
    const softSkills = this.cv.softSkills.map(s => s.id === id ? { ...s, skill: value } : s);
    this.cvService.update({ softSkills });
  }

  async exportPdf() {
    const element = document.getElementById('cv-content');
    if (!element) return;
    const name = this.cv.header.name.replace(/\s+/g, '_') || 'CV';
    const opt = {
      margin: [12, 16, 12, 16],
      filename: `${name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    try {
      await html2pdf().set(opt).from(element).save();
      this.showToast('¡PDF descargado! ✓');
    } catch {
      this.showToast('Error al generar PDF', false);
    }
  }

  async translateToEnglish() {
    this.translating = true;
    try {
      const prompt = `Translate all Spanish text VALUES in this CV JSON to English.
Rules:
- Keep all JSON keys EXACTLY as they are
- Only translate string values that are human-readable text
- Keep URLs, emails, phones, proper names, and technology names unchanged
- Return ONLY the raw JSON object, no markdown, no explanation

JSON:
${JSON.stringify(this.cv, null, 2)}`;

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 6000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      const raw = data.content[0].text.replace(/```json|```/g, '').trim();
      const translated = JSON.parse(raw) as CvData;
      this.cvService.cv.set(translated);
      this.cvService.save();
      this.showToast('¡CV traducido al inglés! ✓');
    } catch (e: any) {
      this.showToast('Error: ' + e.message, false);
    }
    this.translating = false;
  }

  exportJson() { this.cvService.exportJson(); }

  onFileImport(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.cvService.importJson(file)
      .then(() => this.showToast('¡Datos importados! ✓'))
      .catch(() => this.showToast('Error al importar', false));
  }

  reset() {
    if (confirm('¿Restaurar datos originales?')) {
      this.cvService.reset();
      this.showToast('Datos restaurados ✓');
    }
  }

  private showToast(msg: string, ok = true) {
    this.toast = { msg, ok };
    setTimeout(() => this.toast = null, 3500);
  }
}
