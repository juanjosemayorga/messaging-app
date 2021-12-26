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

export interface ImageGridItem {
  item: ImageItem;
  size: number;
  marginTop?: number;
  marginLeft?: number;
}

export interface ImageItem {
  uri: string;
}