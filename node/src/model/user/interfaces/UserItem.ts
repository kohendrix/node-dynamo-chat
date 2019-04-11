/**
 * DB response to model translater.
 */
export interface UserItem {
  uuid: string;
  data: object;
  created: string;
  updated?: string;
}

/**
 * Basic users have password which is not null.
 */
export interface BasicUserItem extends UserItem {
  password: string;
}

/**
 * Typeguard for UserItem.
 * @param obj
 */
export const isUserItem = (obj: object): obj is UserItem => (<UserItem>obj).uuid !== undefined;

/**
 * Typeguard for BasicUserItem.
 * @param obj
 */
export const isBasicUserItem = (obj: object): obj is BasicUserItem =>
  isUserItem(obj) && (<BasicUserItem>obj).password !== undefined;
