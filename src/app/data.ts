export type Contact = {
  id: string;
  name: string;
};

export type Message = {
  id: string;
  contactId: string;
  text: string;
  sentByMe: boolean;
  timestamp: string;
};

export const contacts: Contact[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
];

export const messages: Message[] = [
  { id: 'm1', contactId: '1', text: 'Hi Alice!', sentByMe: true, timestamp: '2025-05-22T10:00:00Z' },
  { id: 'm2', contactId: '1', text: 'Hello! How are you?', sentByMe: false, timestamp: '2025-05-22T10:01:00Z' },
  { id: 'm3', contactId: '2', text: 'Hey Bob!', sentByMe: true, timestamp: '2025-05-22T10:02:00Z' },
  { id: 'm4', contactId: '2', text: 'Hi! What’s up?', sentByMe: false, timestamp: '2025-05-22T10:03:00Z' },
];
