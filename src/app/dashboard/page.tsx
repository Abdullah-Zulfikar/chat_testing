"use client"
import React, { useEffect, useState } from "react";
import { contacts, messages as initialMessages, Message } from "@/app/data";
import ContactList from "@/components/ContactList";
import Chat from "@/components/Chat";


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

export default function Home() {
  const [chats, setChats] = useState<ChatContact[]>([]);
  const [selectedId, setSelectedId] = useState(contacts[0].id);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  

  const handleSelect = (id: string) => setSelectedId(id);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/api/v1/whatsapp/chats/", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          business_id: 5
        })
      })
      if(res.ok) {
        const data = await res.json();
        setChats(data.chats);
        if (data.chats.length > 0) setSelectedId(data.chats[0].id);
      }
      
    }
    fetchData()
  }, [])

  const handleSend = (text: string) => {
    const newMsg: Message = {
    id: `m${Date.now()}`,
    contactId: selectedId,
    text,
    sentByMe: true,
    timestamp: new Date().toISOString(),
  };
    setMessages((msgs) => [...msgs, newMsg]);
    // Simulate a reply after 1s
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          id: `m${Date.now()}r`,
          contactId: selectedId,
          text: "Auto-reply: Got your message!",
          sentByMe: false,
          timestamp: new Date().toISOString(),
        },
      ]);
    }, 1000);
  };

  const filteredMessages = messages.filter((m) => m.contactId === selectedId);

  return (
    <div className="flex h-[80vh] max-h-[700px] w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <h1 className="text-xl font-semibold">
            Chat with{" "}
            {contacts.find((c) => c.id === selectedId)?.name}
          </h1>
        </header>
        <Chat messages={filteredMessages} onSend={handleSend} />
      </div>
    </div>
  );
}
