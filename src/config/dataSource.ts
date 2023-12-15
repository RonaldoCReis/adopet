import { DataSource } from 'typeorm';
import PetEntity from '../entities/petEntity';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/config/database.sqlite',
  entities: [PetEntity],
  synchronize: true,
});
