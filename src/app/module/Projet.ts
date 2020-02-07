import {Product} from './Product';

export class Projet {
  id: number;
  nom: string;
  date_ajout: string;
  produits: Product[] | null | undefined;
}
