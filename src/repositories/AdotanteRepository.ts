import { Repository } from 'typeorm';
import AdotanteEntity from '../entities/AdotanteEntity';
import InterfaceAdotanteRepository from './interface/InterfaceAdotanteRepository';

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;
  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }
  criaAdotante(adotante: AdotanteEntity): void | Promise<void> {
    this.repository.save(adotante);
  }
  async listaAdotante(): Promise<AdotanteEntity[]> {
    const adotantes = await this.repository.find();
    return adotantes;
  }
  async atualizaAdotante(
    id: number,
    adotante: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } });
      if (!adotanteToUpdate) {
        return { success: false, message: 'Adotante não encontrado' };
      }
      Object.assign(adotanteToUpdate, adotante);
      await this.repository.save(adotanteToUpdate);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Ocorreu um erro ao tentar atualizar o adotante.',
      };
    }
  }
  async deletaAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToRemove = await this.repository.findOne({ where: { id } });
      if (!adotanteToRemove) {
        return { success: false, message: 'Adotante não encontrado' };
      }
      await this.repository.remove(adotanteToRemove);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Ocorreu um erro ao tentar excluir o adotante.',
      };
    }
  }
}
