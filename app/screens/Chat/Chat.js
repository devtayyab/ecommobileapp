import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Chat({navigation, route: {params}}) {
  const [messages, setMessages] = useState([]);
  // const [senderId, setSenderId] = useState('');
  const [userdata, setUserData] = useState({});

  const {receiverId} = params;

  console.log(receiverId);

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const Data = JSON.parse(user);

      setUserData(Data);
      console.log('Current User', Data);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   getData();
  //   setMessages([
  //     {
  //       _id: userdata.uid,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: receiverId,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])
  useLayoutEffect(() => {
    getData();
    const unsubscribe = firestore()
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            // _id: receiverId,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })),
        ),
      );
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    firestore().collection('chats').add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      isTyping={true}
      placeholder="Enter Message"
      scrollToBottom
      quickReplyTextStyle={{
        fontWeight: '200',
      }}
      infiniteScroll
      user={{
        _id: userdata?.uid,
        name: userdata?.displayName,
        avatar: '',
      }}
    />
  );
}

export default Chat;
