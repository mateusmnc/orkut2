export class User {
    id: number;
    nome: string;
    email: string;
    senha: string;
    pic: string;

    constructor(id: number, nome: string, email: string, senha: string, pic: string){
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.pic = pic;
    }

  }