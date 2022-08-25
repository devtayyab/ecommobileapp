import { View, Text, } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
  } from './MessageStyle';

export default function AllChats({navigation}) {
    const [users, SetUser] = useState([])
    
    useLayoutEffect(() => {

        const unsubscribe = firestore()
            .collection('users')
            .onSnapshot((snapshot) =>
                SetUser(
                    snapshot.docs.map((doc) => ({ user: doc?.data() })),
                ),
            );
        return unsubscribe;
    }, []);
    console.log('users', users)
    return (
        <Container>
            {/* <Text>Hello</Text> */}
            {users.map((user) =>
                // <View>
                //     <Text>{user?.user?.name}</Text>
                // </View>
                <Card onPress={() => navigation.navigate('Messages',{receiverID: user?.user?.uid})}>
              <UserInfo>
                {/* <UserImgWrapper>
                  <UserImg source={user?.user?.photoURL} />
                </UserImgWrapper> */}
                  <TextSection>
                  <UserInfoText>
                    <UserName>{user?.user?.name}</UserName>
                    {/* <PostTime>{item.messageTime}</PostTime> */}
                  </UserInfoText>
                  {/* <MessageText>{item.messageText}</MessageText> */}
                </TextSection>
              </UserInfo>
            </Card>
            )}

        </Container>
    )
}