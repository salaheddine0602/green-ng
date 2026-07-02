import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface MysteryBox {
  id: string;
  category: string;
  title: string;
  scenario: string;
  options: string[];
}

interface DecisionAnalysis {
  summary: string;
  biasesDetected: string[];
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly box = signal<MysteryBox | null>(null);
  protected readonly analysis = signal<DecisionAnalysis | null>(null);
  protected readonly chosen = signal<string | null>(null);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.http.get<MysteryBox>('/api/boxes/today').subscribe({
      next: (box) => this.box.set(box),
      error: () => this.error.set("Could not open today's box — is the backend running on port 8080?"),
    });
  }

  decide(option: string): void {
    const box = this.box();
    if (!box) {
      return;
    }
    this.chosen.set(option);
    this.http
      .post<DecisionAnalysis>('/api/decisions', {
        boxId: box.id,
        chosenOption: option,
        reasoning: '', // reasoning capture arrives with the interactive MVP (Phase 2)
      })
      .subscribe({
        next: (analysis) => this.analysis.set(analysis),
        error: () => this.error.set('Your decision could not be submitted.'),
      });
  }
}
