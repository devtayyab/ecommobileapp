import { View, Text } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import firestore from '@react-native-firebase/firestore';

export default function AllChats() {
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
    // console.log('users', users[0]['user']['email'])
    return (
        <View>
            <Text>Hello</Text>
            {users.map((user) =>
                <View>
                    <Text>{user?.user?.displayName}</Text>
                </View>
            )}

        </View>
    )
}