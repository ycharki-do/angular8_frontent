import {Projet} from './Projet';

export class Product {
  id: number;
  nom: string;
  date_ajout: string;
  projet: Projet | undefined;
}
