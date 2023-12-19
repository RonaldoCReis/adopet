import PetEntity from '../../entities/PetEntity';

export default interface InterfacePetRepository {
  criaPet(Pet: PetEntity): void | Promise<void>;
  listaPet(): Promise<PetEntity[]> | PetEntity[];
  atualizaPet(
    id: number,
    Pet: PetEntity
  ): Promise<{ success: boolean; message?: string }> | void;
  deletaPet(id: number): Promise<{ success: boolean; message?: string }> | void;
}
