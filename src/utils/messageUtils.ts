import { Cordinate } from "../interfaces/interfaces";

let messageId = 0;

function getNextId() {
  messageId += 1;
  return messageId;
}

export function createTextMessage(text: string) {
  return {
    type: 'text',
    id: getNextId(),
    text,
  };
}

export function createImageMessage(uri: string) {
  return {
    type: 'image',
    id: getNextId(),
    uri,
  };
}

export function createLocationMessage(coordinate: Cordinate) {
  return {
    type: 'location',
    id: getNextId(),
    coordinate,
  };
}
