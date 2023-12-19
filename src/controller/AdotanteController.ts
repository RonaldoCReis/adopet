import { Repository } from 'typeorm';
import AdotanteRepository from '../repositories/AdotanteRepository';
import AdotanteEntity from '../entities/AdotanteEntity';
import { Request, Response } from 'express';

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {
    this.repository = repository;
  }

  async criaAdotante(req: Request, res: Response) {
    const { nome, senha, celular, foto, endereco } = req.body as AdotanteEntity;
    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco
    );
    await this.repository.criaAdotante(novoAdotante);
    return res.status(201).json(novoAdotante);
  }

  async listaAdotante(req: Request, res: Response) {
    const listadeAdotantes = await this.repository.listaAdotante();
    return res.status(200).json(listadeAdotantes);
  }

  async atualizaAdotante(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async deletaAdotante(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAdotante(
      Number(id)
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }
}
