import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marcadetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './marcasdetails.html', 
  styleUrl: './marcasdetails.scss'
})
export class Marcadetails implements OnInit {
  marca: Marca = new Marca(0, "");

  private service = inject(MarcaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id > 0) {
      this.service.findById(id).subscribe(m => {
        if (m) this.marca = m;
      });
    }
  }

  save() {
    // Correção: payload para garantir que o ID seja enviado corretamente apenas se existir
    if (this.marca.id && this.marca.id > 0) {
      this.service.update(this.marca, this.marca.id).subscribe({
        next: () => this.router.navigate(['admin/marcas']),
        error: (err) => console.error('Erro ao atualizar:', err)
      });
    } else {
      const { id, ...payload } = this.marca;
      this.service.save(payload).subscribe({
        next: () => this.router.navigate(['admin/marcas']),
        error: (err) => console.error('Erro ao salvar:', err)
      });
    }
  }
}