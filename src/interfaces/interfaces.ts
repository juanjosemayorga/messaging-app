export interface Cordinate {
  latitude: number;
  longitude: number;
}

export interface Message {
  id: number;
  type?: 'text' | 'image' | 'location';
  text?: string;
  uri?: string;
  coordinate?: Cordinate;
}
