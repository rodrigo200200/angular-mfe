import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface User {
  id?: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);

  cadastroForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.cadastroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const userData: User = this.cadastroForm.value;

      this.http.post<User>('http://localhost:3001/users', userData).subscribe({
        next: (response) => {
          // Compartilhar dados via localStorage para comunicação entre MFEs
          localStorage.setItem('lastCreatedUser', JSON.stringify(response));
          
          // Navegar para o MFE de sucesso
          window.location.href = '/sucesso';
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuário:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  get name() { return this.cadastroForm.get('name'); }
  get email() { return this.cadastroForm.get('email'); }
}
