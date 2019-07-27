export class User {
  uuid?: string;
  name: string;
  email: string;
  pwd: string;
  pic?: string;

  constructor(uuid: string, name: string, email: string, pwd: string, pic: string){
    this.uuid = uuid;
    this.name = name;
    this.email = email;
    this.pwd = pwd;
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