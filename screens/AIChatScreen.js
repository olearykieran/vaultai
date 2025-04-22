import 'react-native-get-random-values'; // Polyfill for uuid
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native';
import * as ChatUI from '@flyerhq/react-native-chat-ui';
import { v4 as uuidv4 } from 'uuid';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { sendMessage } from '../services/aiService';

const aiUser = {
  id: 'ai-coach',
  name: 'Wealth Coach',
  imageUrl: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg',
};

export default function AIChatScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const currentUser = { id: user?.id || 'guest' };

  useEffect(() => {
    const welcomeMessage = {
      author: aiUser,
      createdAt: Date.now(),
      id: uuidv4(),
      text: "Hello! I'm your wealth identity coach. How can I assist you today?",
      type: 'text',
    };
    setMessages([welcomeMessage]);
  }, []);

  const addMessage = (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
  };

  const handleSendPress = useCallback(async (message) => {
    const textMessage = {
      author: currentUser,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: 'text',
    };
    addMessage(textMessage);

    setIsTyping(true);

    try {
      const { message: aiResponseData, error } = await sendMessage(message.text);

      if (error) throw error;

      const aiMessage = {
        author: aiUser,
        createdAt: Date.now(),
        id: uuidv4(),
        text: aiResponseData.text,
        type: 'text',
      };
      addMessage(aiMessage);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        author: aiUser,
        createdAt: Date.now(),
        id: uuidv4(),
        text: 'Sorry, I had trouble processing that. Please try again.',
        type: 'text',
      };
      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  }, [currentUser]);

  const chatTheme = {
    ...ChatUI.defaultTheme,
    colors: {
      background: theme.colors.background,        // Overall background
      inputBackground: theme.colors.card,         // Input area background
      inputText: theme.colors.text,               // Input area text color
      primary: theme.colors.primary,              // User message bubble background
      secondary: theme.colors.card,               // AI message bubble background
      error: theme.colors.notification || '#ff0000', // Error text color
      userAvatarNameColors: [theme.colors.primary], // Colors for avatar initials
    },
    fonts: {
      ...ChatUI.defaultTheme.fonts,
      // Override message text colors
      sentMessageBodyTextStyle: {
        ...ChatUI.defaultTheme.fonts.sentMessageBodyTextStyle,
        color: theme.colors.background, // User message text color (dark for light background)
        fontFamily: theme.typography.fontFamilies.regular, // Apply Satoshi font
      },
      receivedMessageBodyTextStyle: {
        ...ChatUI.defaultTheme.fonts.receivedMessageBodyTextStyle,
        color: theme.colors.text, // AI message text color
        fontFamily: theme.typography.fontFamilies.regular, // Apply Satoshi font
      },
      // Optional: Adjust caption colors if needed
      // sentMessageCaptionTextStyle: {
      //   ...ChatUI.defaultTheme.fonts.sentMessageCaptionTextStyle,
      //   color: theme.colors.subText,
      // },
      // receivedMessageCaptionTextStyle: {
      //   ...ChatUI.defaultTheme.fonts.receivedMessageCaptionTextStyle,
      //   color: theme.colors.subText,
      // },
    },
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ChatUI.Chat
        messages={messages}
        onSendPress={handleSendPress}
        user={currentUser}
        theme={chatTheme}
        isTyping={isTyping}
        showUserAvatars={true}
        inputProps={{
          placeholder: 'Message your wealth coach...',
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});