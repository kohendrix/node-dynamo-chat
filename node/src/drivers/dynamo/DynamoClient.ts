import { log, logE, logD } from '../../commons/util/logger';
import AWS from 'aws-sdk';
import AmazonDaxClient from 'amazon-dax-client';
import {
  DocumentClient,
  PutItemInput,
  PutItemOutput,
  GetItemInput,
  QueryInput,
  ScanInput,
  DeleteItemInput,
  DeleteItemOutput,
  ItemList,
  UpdateItemInput,
  UpdateItemOutput,
} from 'aws-sdk/clients/dynamodb';
const p = logD(__filename);
if (process.env.NODE_ENV === 'development') AWS.config.logger = console;

/**
 * DynamoDB access client.
 * Using DocumentClient.
 */
class DynamoClient {
  public db: DocumentClient; // public for test
  /**
   * @param config aws config
   */
  constructor(config: { [key: string]: any }, dax?: { endpoints: Array<string>; region: string }) {
    AWS.config.update(config);

    this.db = dax
      ? new DocumentClient({ service: new AmazonDaxClient({ endpoints: dax.endpoints, region: dax.region }) })
      : new DocumentClient();
  }

  /**
   * Put a single object.
   * @param params
   * @returns
   */
  async putItemSync(params: PutItemInput): Promise<PutItemOutput> {
    try {
      return await this.db.put(params).promise();
    } catch (error) {
      throw new DynamoError(error);
    }
  }

  /**
   * Put a single object.
   * @param params
   * @param cb
   * @returns
   */
  putItem(params: PutItemInput, cb: (err?: DynamoError, result?: PutItemOutput) => void): void {
    this.db.put(params, (e, data) => {
      e ? cb(new DynamoError(e)) : cb(undefined, data);
    });
  }

  /**
   * Update a single object.
   * @param params
   * @returns
   */
  async updateItemSync(params: UpdateItemInput): Promise<UpdateItemOutput> {
    try {
      return await this.db.update(params).promise();
    } catch (error) {
      throw new DynamoError(error);
    }
  }

  /**
   * Update a single object.
   * @param params
   * @param cb
   * @returns
   */
  updateItem(params: UpdateItemInput, cb: (err?: DynamoError, result?: PutItemOutput) => void): void {
    this.db.update(params, (e, data) => {
      e ? cb(new DynamoError(e)) : cb(undefined, data);
    });
  }

  /**
   * Get by the key.
   * @param params
   * @returns
   */
  async getItemSync(params: GetItemInput): Promise<object | undefined> {
    try {
      const data = await this.db.get(params).promise();
      return data.Item;
    } catch (error) {
      throw new DynamoError(error);
    }
  }

  /**
   * Get by the key.
   * @param params
   * @param cb
   * @returns
   */
  getItem(params: GetItemInput, cb: (err?: DynamoError, result?: object) => void): void {
    this.db.get(params, (e, data) => {
      e ? cb(new DynamoError(e)) : cb(undefined, data.Item);
    });
  }

  /**
   * Run query.
   * @param params
   * @returns
   */
  async queryTableSync(params: QueryInput): Promise<ItemList | undefined> {
    try {
      const data = await this.db.query(params).promise();

      return data.Items;
    } catch (error) {
      throw new DynamoError(error);
    }
  }

  /**
   * Run query.
   * @param params
   * @param
   * @returns
   */
  queryTable(params: QueryInput, cb: (err?: DynamoError, result?: object) => void): void {
    this.db.query(params, (e, data) => {
      e ? cb(new DynamoError(e)) : cb(undefined, data.Items);
    });
  }

  /**
   * Run scan.
   * @param params
   * @returns
   */
  async scanTableSync(params: ScanInput): Promise<ItemList | undefined> {
    try {
      const data = await this.db.scan(params).promise();

      return data.Items;
    } catch (error) {
      throw new DynamoError(error);
    }
  }

  /**
   * Run scan.
   * @param params
   * @param
   * @returns
   */
  scanTable(params: ScanInput, cb: (err?: DynamoError, result?: object) => void): void {
    this.db.scan(params, (e, data) => {
      e ? cb(new DynamoError(e)) : cb(undefined, data.Items);
    });
  }

  /**
   * Delete a single object.
   * @param params
   * @returns
   */
  async deleteItemSync(params: DeleteItemInput): Promise<DeleteItemOutput> {
    try {
      return await this.db.delete(params).promise();
    } catch (error) {
      throw new DynamoError(error);
    }
  }

  /**
   * Delete a single object.
   * @param params
   * @param cb
   * @returns
   */
  deleteItem(params: DeleteItemInput, cb: (err?: DynamoError, result?: DeleteItemOutput) => void): void {
    this.db.delete(params, (e, data) => {
      e ? cb(new DynamoError(e)) : cb(undefined, data);
    });
  }
}

/**
 * Module error class.
 */
class DynamoError extends Error {
  public statusCode: number;
  /**
   * @param error_object
   */
  constructor(error_object: Error) {
    super(error_object.message);
    this.message = error_object.message;
    this.statusCode = 500;
  }
}

export { DynamoClient, DynamoError };
