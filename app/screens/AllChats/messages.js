import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Chat({ navigation, route: { params } }) {
    const [messages, setMessages] = useState([]);

    const [userdata, setUserData] = useState({});

    const { productSellerId } = params;

    console.log(params, 'params');

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
                        reciever: doc.data()?.reciever
                    })),
                ),
            );
        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
        const { _id, createdAt, text, user } = messages[0];
        firestore().collection('chats').add({
            _id,
            createdAt,
            text,
            user,
            reciever: productSellerId
        });
    }, []);

    return (
        <GiftedChat
            messages={messages.filter((v) => v.reciever == userdata?.uid || v.user?._id == userdata?.uid) ?? []}
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
