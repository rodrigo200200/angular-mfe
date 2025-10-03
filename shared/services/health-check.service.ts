import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface HealthStatus {
  service: string;
  status: 'online' | 'offline' | 'checking';
  lastCheck: Date;
  responseTime?: number;
}

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  private healthStatus = new BehaviorSubject<HealthStatus[]>([
    { service: 'MFE Cadastro', status: 'checking', lastCheck: new Date() },
    { service: 'MFE Sucesso', status: 'checking', lastCheck: new Date() },
    { service: 'API Backend', status: 'checking', lastCheck: new Date() }
  ]);

  public healthStatus$ = this.healthStatus.asObservable();

  private endpoints = [
    { name: 'MFE Cadastro', url: 'http://localhost:4201/remoteEntry.js' },
    { name: 'MFE Sucesso', url: 'http://localhost:4202/remoteEntry.js' },
    { name: 'API Backend', url: 'http://localhost:3001/users' }
  ];

  constructor(private http: HttpClient) {
    this.startHealthCheck();
  }

  private startHealthCheck(): void {
    // Verifica a cada 30 segundos
    interval(30000).subscribe(() => {
      this.checkAllServices();
    });

    // Verificação inicial
    this.checkAllServices();
  }

  private checkAllServices(): void {
    this.endpoints.forEach(endpoint => {
      this.checkService(endpoint.name, endpoint.url);
    });
  }

  private checkService(serviceName: string, url: string): void {
    const startTime = Date.now();
    
    this.http.get(url, { observe: 'response' }).pipe(
      map(response => {
        const responseTime = Date.now() - startTime;
        return {
          service: serviceName,
          status: 'online' as const,
          lastCheck: new Date(),
          responseTime
        };
      }),
      catchError(() => {
        return [{
          service: serviceName,
          status: 'offline' as const,
          lastCheck: new Date()
        }];
      })
    ).subscribe(status => {
      this.updateServiceStatus(status);
    });
  }

  private updateServiceStatus(newStatus: HealthStatus): void {
    const currentStatuses = this.healthStatus.value;
    const updatedStatuses = currentStatuses.map(status => 
      status.service === newStatus.service ? newStatus : status
    );
    this.healthStatus.next(updatedStatuses);
  }

  public getServiceStatus(serviceName: string): Observable<HealthStatus | undefined> {
    return this.healthStatus$.pipe(
      map(statuses => statuses.find(s => s.service === serviceName))
    );
  }

  public checkServiceNow(serviceName: string): void {
    const endpoint = this.endpoints.find(e => e.name === serviceName);
    if (endpoint) {
      this.checkService(endpoint.name, endpoint.url);
    }
  }
}
