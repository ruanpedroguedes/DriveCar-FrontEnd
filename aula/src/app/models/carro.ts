import { Marca } from "./marca";

export class Carro {

    id?: number | null;
    nome!: string;
    modelo!: string;
    marca!: any;

    constructor(id: number | null, nome: string, modelo: string, marca: Marca){
        this.id = id
        this.nome = nome
        this.modelo =  modelo;
        this.marca = marca
    }

}
