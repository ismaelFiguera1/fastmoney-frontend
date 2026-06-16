export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface ChatBotStylesProps {
  $isOpen?: boolean;  // ← el $ es el cambio clave
}