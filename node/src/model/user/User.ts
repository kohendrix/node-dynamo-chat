/**
 * User Entity class
 */
export class User {
  public type: UserType;
  public uuid: string;
  public data: object;
  public created: Date;
  public updated?: Date;

  /**
   * @param type Basic, Google etc.
   * @param uuid For basic users this will be their email, for social users it's the uuid issued by the media.
   * @param data This is the actual data exposed to clients. if the data passed is undefined, initializes with an empty object.
   * @param created The date the account was created.
   * @param updated The last updated date.
   */
  constructor(type: UserType, uuid: string, data: object = {}, created: Date, updated?: Date) {
    this.type = type;
    this.uuid = uuid;
    this.data = data;
    this.created = created;
    this.updated = updated;
  }

  /**
   * for response
   * @returns A User data, the schema is not defined.
   */
  public serialize(): object {
    return this.data;
  }
}

/**
 * user type would be basic (email, password) or social media types such as Google.
 */
export enum UserType {
  Basic = 0,
  Google = 1,
}
