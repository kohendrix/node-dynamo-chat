export type ConfigSchema = {
  mysql: {
    master: {
      connectionLimit: number;
      host: string;
      user: string;
      password: string;
      database: string;
      port: number;
      ssl: false;
      connectTimeout: number;
    };
  };
  server: {
    baseUri: string;
    port: number;
    key: string;
    cert: string;
  };
  redis: {
    host: string;
    port: number;
  };
  aws: {
    sslEnabled: boolean;
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    endpoint: string;
    dax: {
      endpoints: [];
    };
  };
};
