import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthCheckService, HealthStatus } from '../../services/health-check.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-status-dashboard',
  imports: [CommonModule],
  template: `
    <div class="status-dashboard">
      <h3>🔍 Status dos Microfrontends</h3>
      
      <div class="status-grid">
        <div *ngFor="let status of healthStatus$ | async" 
             class="status-card" 
             [ngClass]="'status-' + status.status">
          
          <div class="status-header">
            <h4>{{ status.service }}</h4>
            <div class="status-indicator" [ngClass]="'indicator-' + status.status">
              <span class="status-dot"></span>
              <span class="status-text">{{ getStatusText(status.status) }}</span>
            </div>
          </div>
          
          <div class="status-details">
            <p><strong>Última verificação:</strong> {{ formatTime(status.lastCheck) }}</p>
            <p *ngIf="status.responseTime">
              <strong>Tempo de resposta:</strong> {{ status.responseTime }}ms
            </p>
          </div>
          
          <button (click)="checkService(status.service)" 
                  class="check-btn"
                  [disabled]="status.status === 'checking'">
            {{ status.status === 'checking' ? 'Verificando...' : 'Verificar Agora' }}
          </button>
        </div>
      </div>
      
      <div class="dashboard-actions">
        <button (click)="checkAllServices()" class="btn-primary">
          Verificar Todos os Serviços
        </button>
      </div>
    </div>
  `,
  styles: [`
    .status-dashboard {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      margin: 20px;
    }
    
    .status-dashboard h3 {
      margin-bottom: 24px;
      color: #333;
      text-align: center;
    }
    
    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }
    
    .status-card {
      border: 2px solid #e9ecef;
      border-radius: 8px;
      padding: 20px;
      transition: all 0.3s ease;
    }
    
    .status-card.status-online {
      border-color: #28a745;
      background: #f8fff9;
    }
    
    .status-card.status-offline {
      border-color: #dc3545;
      background: #fff8f8;
    }
    
    .status-card.status-checking {
      border-color: #ffc107;
      background: #fffdf5;
    }
    
    .status-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .status-header h4 {
      margin: 0;
      color: #495057;
    }
    
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .status-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    .indicator-online .status-dot {
      background: #28a745;
    }
    
    .indicator-offline .status-dot {
      background: #dc3545;
    }
    
    .indicator-checking .status-dot {
      background: #ffc107;
    }
    
    .status-text {
      font-weight: 500;
      font-size: 14px;
    }
    
    .indicator-online .status-text {
      color: #28a745;
    }
    
    .indicator-offline .status-text {
      color: #dc3545;
    }
    
    .indicator-checking .status-text {
      color: #ffc107;
    }
    
    .status-details {
      margin-bottom: 16px;
    }
    
    .status-details p {
      margin: 4px 0;
      font-size: 14px;
      color: #6c757d;
    }
    
    .check-btn {
      width: 100%;
      padding: 8px 16px;
      border: 1px solid #007bff;
      background: white;
      color: #007bff;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .check-btn:hover:not(:disabled) {
      background: #007bff;
      color: white;
    }
    
    .check-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .dashboard-actions {
      text-align: center;
    }
    
    .btn-primary {
      padding: 12px 24px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .btn-primary:hover {
      background: #0056b3;
    }
    
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
      }
    }
  `]
})
export class StatusDashboardComponent implements OnInit {
  healthStatus$: Observable<HealthStatus[]>;

  constructor(private healthCheckService: HealthCheckService) {
    this.healthStatus$ = this.healthCheckService.healthStatus$;
  }

  ngOnInit(): void {}

  getStatusText(status: string): string {
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'checking': return 'Verificando...';
      default: return 'Desconhecido';
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-BR');
  }

  checkService(serviceName: string): void {
    this.healthCheckService.checkServiceNow(serviceName);
  }

  checkAllServices(): void {
    // Trigger manual check for all services
    window.location.reload();
  }
}
