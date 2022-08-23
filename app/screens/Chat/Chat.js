import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      isTyping = {true}
      placeholder = "Enter Message"
      scrollToBottom
      quickReplyTextStyle={{
        fontWeight: '200',
      }}
      infiniteScroll
      user={{
        _id: 1,
      }}
    />
  )
}

export default Chat;