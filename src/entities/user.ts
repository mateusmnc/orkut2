import { Observable } from "rxjs";

export class User {
  uid?: string;
  userId?: string;
  name: string;
  email: string;
  pwd?: string;
  pic?: string;
  picData?: Observable<string | null>;
}