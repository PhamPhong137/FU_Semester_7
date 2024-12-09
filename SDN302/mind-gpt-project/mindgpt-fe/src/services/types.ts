export interface IResponse<Data> {
  status: number;
  message: string;
  data: Data;
}

export interface IError {
  status: number;
  message: string;
}
export type IKeyValueObject<K, V> = {
  key: K;
  value: V;
};

export type IMetadata = Record<string, string>;
