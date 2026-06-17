import React, { useState, useRef, useEffect } from 'react';
import { Message } from './ChatBot.types';
import * as S from './ChatBotStyles';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '¡Hola! Soy FastBot 🤖, tu asistente de FastMoney. ¿En qué te puedo ayudar hoy?',
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(prev => !prev);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: userMessage.text }),
      });
      const data = await res.json();
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.respuesta,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch {
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: 'Hubo un error al contactar el servidor. Intenta de nuevo.',
        timestamp: new Date(),
      }]);
    }
  };

  return (
    <>
      <S.BotFloatButton onClick={toggleChat} aria-label="Abrir asistente FastBot">
        🤖
      </S.BotFloatButton>

      <S.ChatContainer $isOpen={isOpen}>
        <S.ChatHeader>
          <S.HeaderInfo>
            <S.BotStatusDot />
            <S.ChatTitle>FastBot</S.ChatTitle>
          </S.HeaderInfo>
          <S.CloseButton onClick={toggleChat} aria-label="Cerrar chat">
            &times;
          </S.CloseButton>
        </S.ChatHeader>

        <S.MessagesArea>
          {messages.map(msg => (
            <S.MessageBubble key={msg.id} $isUser={msg.sender === 'user'}>
              {msg.text}
            </S.MessageBubble>
          ))}
          <div ref={messagesEndRef} />
        </S.MessagesArea>

        <S.InputArea onSubmit={handleSendMessage}>
          <S.ChatInput
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Escribe un mensaje..."
            maxLength={500}
          />
          <S.SendButton type="submit" disabled={!inputValue.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </S.SendButton>
        </S.InputArea>
      </S.ChatContainer>
    </>
  );
}