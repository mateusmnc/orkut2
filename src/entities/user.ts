export class User {
  uuid?: string;
  name: string;
  email: string;
  pwd: string;
  pic?: string;

  constructor(name: string, email: string, pwd: string, pic?: string, uuid?: string){
    this.name = name;
    this.email = email;
    this.pwd = pwd;
    this.uuid = uuid;
    this.pic = pic;
  }
}

export interface UserResponse{
  result?: {
    email?: string;
    uuid?: string;
  };

  error?: {
    code?: string;
    message?: string;
  }
}