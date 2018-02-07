export class User {
  constructor(
    public userId?: number,
    public userName?: string,
    public userFirstName?: string,
    public userLastName?: string,
    public authorities?: any[]
  ) { }
}
