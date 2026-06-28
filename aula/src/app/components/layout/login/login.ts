import { Component, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  usuario!: string;
  senha!: string;

 
  router = inject(Router); 

  logar() {
    if (this.usuario == 'admin' && this.senha == 'adm') {
      this.router.navigate(['admin/carros']);
    } else {
      alert('Usuario ou senha estar incorreto');
    }
  }
}