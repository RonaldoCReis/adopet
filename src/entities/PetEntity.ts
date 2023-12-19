import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import EnumEspecie from '../enum/EnumEspecie';

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  especie: EnumEspecie;
  @Column()
  adotado: boolean;
  @Column()
  dataDeNascimento: Date;

  constructor(
    nome: string,
    especie: EnumEspecie,
    adotado: boolean,
    dataDeNascimento: Date
  ) {
    this.nome = nome;
    this.especie = especie;
    this.adotado = adotado;
    this.dataDeNascimento = dataDeNascimento;
  }
}
