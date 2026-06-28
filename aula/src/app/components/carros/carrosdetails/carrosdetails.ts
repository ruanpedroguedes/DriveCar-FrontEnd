import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Carro } from '../../../models/carro';
import { Marca } from '../../../models/marca';
import { CarroService } from '../../../services/carro';
import { MarcaService } from '../../../services/marca';

@Component({
  selector: 'app-carrosdetails',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './carrosdetails.html',
  styleUrl: './carrosdetails.scss'
})
export class Carrosdetails implements OnInit { 
  
  carro: Carro = new Carro(0, "", "", {id: 0, nome: ""}); 
  marcas: Marca[] = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private carroService = inject(CarroService);
  private marcaService = inject(MarcaService);

  ngOnInit(): void {
    this.marcaService.findAll().subscribe(retorno => this.marcas = retorno);

    const id = this.route.snapshot.params['id'];
    if (id > 0){
      this.findById(id);
    }
  }

  findById(id: number) {
    this.carroService.findById(id).subscribe({
      next: (retorno) => this.carro = retorno,
      error: () => Swal.fire('Erro', 'Não foi possível carregar o carro.', 'error')
    });
  }

  save() {
    const id = this.carro.id;

    if (id && id > 0) {
      // Edição: Passa o objeto completo e o ID
      this.carroService.update(this.carro, id).subscribe({
        next: () => {
          Swal.fire('Sucesso', 'Editado com sucesso!', 'success');
          this.router.navigate(['admin/carros']);
        },
        error: () => Swal.fire('Erro', 'Não foi possível editar.', 'error')
      });
    } else {
      // Novo cadastro: Cria payload sem ID para o backend criar um novo
      // Usamos 'any' para evitar conflito de tipos com o modelo Carro
      const payload: any = { ...this.carro };
      delete payload.id; 

      this.carroService.save(payload).subscribe({
        next: () => {
          Swal.fire('Sucesso', 'Salvo com sucesso!', 'success');
          this.router.navigate(['admin/carros']);
        },
        error: () => Swal.fire('Erro', 'Não foi possível salvar.', 'error')
      });
    }
  }
}