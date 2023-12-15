import { Request, Response } from 'express';
import TipoPet from '../tipos/TipoPet';
import EnumEspecie from '../enum/EnumEspecie';

let listaDePets: TipoPet[] = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
  criaPet(req: Request, res: Response) {
    const { adotado, especie, dataDeNascimento, nome } = req.body as TipoPet;
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ mensagem: `Especie não permitida` });
    }
    const novoPet: TipoPet = {
      id: geraId(),
      adotado,
      especie,
      dataDeNascimento,
      nome,
    };
    listaDePets.push(novoPet);
    return res.status(201).json(novoPet);
  }

  listaPet(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }

  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { adotado, especie, dataDeNascimento, nome } = req.body as TipoPet;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ mensagem: 'Pet não encontrado' });
    }
    pet.adotado = adotado;
    pet.especie = especie;
    pet.dataDeNascimento = dataDeNascimento;
    pet.nome = nome;
    return res.status(200).json(pet);
  }

  deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ mensagem: 'Pet não encontrado' });
    }
    listaDePets = listaDePets.filter((pet) => pet.id !== Number(id));
    return res.status(200).json({ mensagem: 'Pet deletado com sucesso' });
  }
}
