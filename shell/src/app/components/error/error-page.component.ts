import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="error-page">
      <div class="error-content">
        <div class="error-icon">🔍</div>
        <h1>404</h1>
        <h2>Página Não Encontrada</h2>
        <p>A página que você está procurando não existe ou foi movida.</p>
        
        <div class="error-suggestions">
          <h3>Que tal tentar:</h3>
          <ul>
            <li><a routerLink="/cadastro" class="link">Fazer um novo cadastro</a></li>
            <li><a routerLink="/sucesso" class="link">Ver página de sucesso</a></li>
            <li><a href="/" class="link">Voltar ao início</a></li>
          </ul>
        </div>
        
        <div class="error-actions">
          <button (click)="goBack()" class="btn-primary">Voltar</button>
          <button routerLink="/cadastro" class="btn-secondary">Início</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .error-content {
      background: white;
      border-radius: 16px;
      padding: 60px 40px;
      text-align: center;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    }
    
    .error-icon {
      font-size: 72px;
      margin-bottom: 20px;
    }
    
    h1 {
      font-size: 96px;
      font-weight: 900;
      margin: 0;
      background: linear-gradient(45deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    h2 {
      color: #495057;
      margin: 16px 0 8px;
      font-size: 28px;
    }
    
    p {
      color: #6c757d;
      margin-bottom: 32px;
      font-size: 16px;
    }
    
    .error-suggestions {
      margin: 32px 0;
      text-align: left;
    }
    
    .error-suggestions h3 {
      color: #495057;
      margin-bottom: 16px;
      text-align: center;
    }
    
    .error-suggestions ul {
      list-style: none;
      padding: 0;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
    }
    
    .error-suggestions li {
      margin: 12px 0;
      padding: 8px 0;
      border-bottom: 1px solid #dee2e6;
    }
    
    .error-suggestions li:last-child {
      border-bottom: none;
    }
    
    .link {
      color: #007bff;
      text-decoration: none;
      font-weight: 500;
    }
    
    .link:hover {
      text-decoration: underline;
    }
    
    .error-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 32px;
    }
    
    .btn-primary, .btn-secondary {
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      border: none;
      text-decoration: none;
      display: inline-block;
    }
    
    .btn-primary {
      background: #007bff;
      color: white;
    }
    
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    
    .btn-primary:hover {
      background: #0056b3;
    }
    
    .btn-secondary:hover {
      background: #545b62;
    }
  `]
})
export class ErrorPageComponent {
  goBack(): void {
    window.history.back();
  }
}
