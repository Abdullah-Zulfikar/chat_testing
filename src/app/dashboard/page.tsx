"use client"
import React, { useEffect, useState } from "react";
import { messages as initialMessages, Message } from "@/app/data";
import ContactList from "@/components/ContactList";
import Chat from "@/components/Chat";


// 1. Define the interface for a chat contact
export interface ChatContact {
  id: number;
  whatsapp_name: string;
  custom_whatsapp_name: string;
  phone_number: string;
  business: number;
  customer: number;
  super_admin: number;
  agent: number | null;
  unread_count: number;
  last_message_at: string | null;
}

// 2. Use the interface and fetch contacts from backend
export default function Home() {
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/whatsapp/chats/list?business_id=5", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      const data = await res.json();
      setContacts(data.chats);
      if (data.chats.length > 0) setSelectedId(data.chats[0].id);
    }
  };
  fetchData();
}, []);

  const handleSelect = (id: string) => setSelectedId(Number(id));

  const handleSend = (text: string) => {
      if (!selectedId) return;
      const newMsg: Message = {
        id: `m${Date.now()}`,
        contactId: selectedId.toString(),
        text,
        sentByMe: true,
        timestamp: new Date().toISOString(),
      };
      setMessages((msgs) => [...msgs, newMsg]);
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          {
            id: `m${Date.now()}r`,
            contactId: selectedId.toString(),
            text: "Auto-reply: Got your message!",
            sentByMe: false,
            timestamp: new Date().toISOString(),
          } as Message,
        ]);
      }, 1000);
    };

  const filteredMessages = messages.filter((m) => m.contactId === (selectedId !== null ? selectedId.toString() : ""));

  return (
    <div className="flex h-[80vh] max-h-[700px] w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <ContactList
        contacts={contacts.map((c) => ({
          id: c.id.toString(),
          name: c.custom_whatsapp_name || c.whatsapp_name || c.phone_number,
        }))}
        selectedId={selectedId ? selectedId.toString() : ""}
        onSelect={handleSelect}
      />
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <h1 className="text-xl font-semibold">
            Chat with{" "}
            {contacts.find((c) => c.id === selectedId)?.custom_whatsapp_name ||
              contacts.find((c) => c.id === selectedId)?.whatsapp_name ||
              contacts.find((c) => c.id === selectedId)?.phone_number}
          </h1>
        </header>
        <Chat messages={filteredMessages} onSend={handleSend} />
      </div>
    </div>
  );
}