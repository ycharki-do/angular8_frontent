
import {Reference} from './Reference';
import {Code} from './Code';

export class  HistCode {
  id: number;
  date_debut: Date;
  date_fin: Date;
  code: Code | undefined;
  reference: Reference | undefined;
}
