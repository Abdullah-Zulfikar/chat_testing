import React from 'react';
import { Contact } from '../app/data';

type ContactListProps = {
  contacts: Contact[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function ContactList({ contacts, selectedId, onSelect }: ContactListProps) {
  return (
    <aside className="w-full max-w-xs bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold p-4 border-b border-gray-200 dark:border-gray-800">Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${selectedId === contact.id ? 'bg-gray-100 dark:bg-gray-800 font-bold' : ''}`}
              onClick={() => onSelect(contact.id)}
            >
              {contact.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
