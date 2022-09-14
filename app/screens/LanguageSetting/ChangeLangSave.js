import AsyncStorage from '@react-native-async-storage/async-storage';
 
export const setslng=(data)=>{
        data=JSON.stringify(data)
        return AsyncStorage.setItem('language',data)
}

export const getlang=()=>{
    return new Promise((resolve,rejection)=>{
            AsyncStorage.getItem('language').then(data=>{
                resolve(JSON.parse(data))
            })
    })
}