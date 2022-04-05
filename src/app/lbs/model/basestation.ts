export interface Basestation {
  latitude: number;
  longitude: number;
  lac: number;
  cell: number;
  radioType: 'LTE' | 'GSM',
  address: string,
  region: number;
}
