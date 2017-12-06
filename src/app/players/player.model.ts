export class Player {
  public firstName: string;
  public lastName: string;
  public email: string;
  public status: string;
  public password: string;

  constructor (firstName: string, lastName: string, email: string, status: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.status = status;
    this.password = password;
  }
}
