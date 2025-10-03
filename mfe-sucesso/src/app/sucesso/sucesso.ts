import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface User {
  id?: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-sucesso',
  imports: [CommonModule],
  templateUrl: './sucesso.html',
  styleUrl: './sucesso.scss'
})
export class Sucesso implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  user: User | null = null;
  allUsers: User[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadUserData();
    this.loadAllUsers();
  }

  loadUserData(): void {
    // Recuperar dados do usuário recém-cadastrado do localStorage
    const userData = localStorage.getItem('lastCreatedUser');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  loadAllUsers(): void {
    this.http.get<User[]>('http://localhost:3001/users').subscribe({
      next: (users) => {
        this.allUsers = users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.loading = false;
      }
    });
  }

  voltarAoCadastro(): void {
    // Limpar dados do localStorage
    localStorage.removeItem('lastCreatedUser');
    
    // Navegar de volta para o cadastro
    window.location.href = '/cadastro';
  }
}
