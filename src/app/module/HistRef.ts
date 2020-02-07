import {Product} from './Product';
import {Reference} from './Reference';

export class  HistRef {
  id: number;
  date_debut: Date;
  date_fin: Date;
  produit: Product | undefined;
  reference: Reference | undefined;
}
