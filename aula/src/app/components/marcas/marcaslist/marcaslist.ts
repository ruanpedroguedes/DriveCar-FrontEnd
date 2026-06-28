import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marcaslist.html',
  styleUrl: './marcaslist.scss'
})
export class Marcaslist implements OnInit {
  
 
  marcas: Marca[] = [];
  
 
  private marcaService = inject(MarcaService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.carregarMarcas();
  }

  // Busca os dados no back-end
  carregarMarcas() {
    this.marcaService.findAll().subscribe({
      next: (retorno) => {
        this.marcas = retorno;
       
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar marcas:', erro);
      }
    });
  }


  editar(id: number) {
    this.router.navigate(['admin/marcas/edit', id]);
  }

 
  deletar(id: number) {
    this.marcaService.deleteById(id).subscribe({
      next: () => {
        this.carregarMarcas();
      },
      error: (erro) => {
        console.error('Erro ao deletar marca:', erro);
      }
    });
  }

  adicionar() {
  this.router.navigate(['admin/marcas/edit', 0]); 
}
}