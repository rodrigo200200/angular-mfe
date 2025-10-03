import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-boundary',
  imports: [CommonModule],
  template: `
    <div class="error-boundary" *ngIf="hasError">
      <div class="error-card">
        <h2>🚫 Erro no Microfrontend</h2>
        <p>{{ errorMessage }}</p>
        <div class="error-actions">
          <button (click)="retry()" class="retry-btn">Tentar Novamente</button>
          <button (click)="goHome()" class="home-btn">Voltar ao Início</button>
        </div>
      </div>
    </div>
    
    <div *ngIf="!hasError">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .error-boundary {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      background: #f8f9fa;
    }
    
    .error-card {
      background: white;
      border-radius: 10px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      max-width: 500px;
    }
    
    .error-card h2 {
      color: #dc3545;
      margin-bottom: 16px;
    }
    
    .error-actions {
      margin-top: 24px;
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    
    .retry-btn, .home-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .retry-btn {
      background: #007bff;
      color: white;
    }
    
    .home-btn {
      background: #6c757d;
      color: white;
    }
  `]
})
export class ErrorBoundary {
  @Input() hasError = false;
  @Input() errorMessage = 'Falha ao carregar o microfrontend. Verifique se todos os serviços estão rodando.';

  retry(): void {
    window.location.reload();
  }

  goHome(): void {
    window.location.href = '/';
  }
}
