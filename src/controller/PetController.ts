import { Request, Response } from 'express';
import EnumEspecie from '../enum/EnumEspecie';
import PetRepository from '../repositories/PetRepository';
import PetEntity from '../entities/PetEntity';

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
  constructor(private repository: PetRepository) {
    this.repository = repository;
  }
  async criaPet(req: Request, res: Response) {
    const { adotado, especie, dataDeNascimento, nome } = req.body as PetEntity;
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ mensagem: `Especie não permitida` });
    }
    const novoPet = new PetEntity(nome, especie, adotado, dataDeNascimento);
    await this.repository.criaPet(novoPet);
    return res.status(201).json(novoPet);
  }

  async listaPet(req: Request, res: Response) {
    const listadePets = await this.repository.listaPet();
    return res.status(200).json(listadePets);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }
}
