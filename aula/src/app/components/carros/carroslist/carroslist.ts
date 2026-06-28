import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CarroService } from './../../../services/carro';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './carroslist.html',
  styleUrl: './carroslist.scss',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class Carroslist implements OnInit {

  carroService = inject(CarroService);
  cdr = inject(ChangeDetectorRef); 
  lista: Carro[] = [];

  constructor() {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.carroService.findAll().subscribe({
      next: listaVindaDoJava => {
        this.lista = listaVindaDoJava;
        this.cdr.detectChanges(); 
      },
      error: erro => console.error(erro)
    });
  }

  deleteById(carro: Carro) {
    Swal.fire({
      title: 'Tem certeza?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      // Correção: Verificação de segurança para o ID
      if (result.isConfirmed && carro.id != null) {
        this.carroService.deleteById(carro.id).subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Deletado com sucesso!', 'success');
            this.findAll();
          },
          error: () => Swal.fire('Erro', 'Não foi possível deletar.', 'error')
        });
      }
    });
  }
}