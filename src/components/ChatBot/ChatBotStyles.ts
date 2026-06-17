import styled, { keyframes } from 'styled-components';
import { ChatBotStylesProps } from './ChatBot.types';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const BotFloatButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%);
  color: #ffffff;
  border: none;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(109, 40, 217, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: scale(1.08);
  }
`;

export const ChatContainer = styled.div<ChatBotStylesProps>`
  position: fixed;
  bottom: 96px;
  right: 24px;
  width: 360px;
  height: 500px;
  background-color: #1e1b4b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  display: ${props => (props.$isOpen ? 'flex' : 'none')};
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  animation: ${fadeIn} 0.25s ease-out;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

export const ChatHeader = styled.div`
  background: linear-gradient(90deg, #1e1b4b 0%, #2e1065 100%);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const BotStatusDot = styled.span`
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  display: inline-block;
`;

export const ChatTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

export const MessagesArea = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #0f172a;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
`;

export const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
  color: #ffffff;
  align-self: ${props => (props.$isUser ? 'flex-end' : 'flex-start')};
  background: ${props =>
    props.$isUser
      ? 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)'
      : 'rgba(255, 255, 255, 0.08)'};
  border-bottom-right-radius: ${props => (props.$isUser ? '2px' : '12px')};
  border-bottom-left-radius: ${props => (props.$isUser ? '12px' : '2px')};
`;

export const InputArea = styled.form`
  padding: 12px 16px;
  background-color: #1e1b4b;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ChatInput = styled.input`
  flex: 1;
  background-color: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 10px 16px;
  color: #ffffff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus { border-color: #6d28d9; }
  &::placeholder { color: rgba(255, 255, 255, 0.4); }
`;

export const SendButton = styled.button`
  background: #6d28d9;
  color: #ffffff;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover { background: #5b21b6; }
  &:disabled {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.2);
    cursor: not-allowed;
  }
`;