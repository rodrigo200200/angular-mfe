import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  template: `
    <div class="loading-container" [ngClass]="{'fullscreen': fullscreen}">
      <div class="loading-content">
        <div class="loading-spinner">
          <div class="spinner"></div>
        </div>
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <div class="loading-progress" *ngIf="showProgress">
          <div class="progress-bar" [style.width.%]="progress"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px 20px;
    }
    
    .loading-container.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(255, 255, 255, 0.9);
      z-index: 9999;
    }
    
    .loading-content {
      text-align: center;
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    .loading-spinner {
      margin-bottom: 20px;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    h3 {
      color: #333;
      margin-bottom: 8px;
    }
    
    p {
      color: #666;
      margin-bottom: 20px;
    }
    
    .loading-progress {
      width: 100%;
      height: 4px;
      background: #f0f0f0;
      border-radius: 2px;
      overflow: hidden;
    }
    
    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #007bff, #0056b3);
      transition: width 0.3s ease;
    }
  `]
})
export class LoadingComponent {
  @Input() title = 'Carregando Microfrontend';
  @Input() message = 'Aguarde enquanto o módulo é carregado...';
  @Input() fullscreen = false;
  @Input() showProgress = false;
  @Input() progress = 0;
}
