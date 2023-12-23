import {View, TouchableOpacity, Text, Image} from 'react-native';
import { TextInput, Button, Stack } from "@react-native-material/core";
import styles from './style/editDescription';
import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from 'react-native-vector-icons';
import {setUserInfo} from '../Redux/userSlice';

function EditDescription({navigation}) {
    const dispatch = useDispatch();
    const [isActive, setActive] = useState(false);
    const [description, setDescription] = useState('');
    const [desLen, setDesLen] = useState(0);
    const {user} = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        if (description.length > 0) {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={() => { setUserDescription(); navigation.goBack() }}>
                        <Text style={{ color: 'black', fontSize: 18 }}>Lưu</Text>
                    </TouchableOpacity>
                )
            })
        } else {
            navigation.setOptions({
                headerRight: () => (
                    <Text style={{ color: '#6b6b6b', fontSize: 18 }}>Lưu</Text>
                )
            })
        }
    },[description]);

    const setUserDescription = () => {
        dispatch(setUserInfo({des: description, userId: user.id}));
    }
    return <View style={styles.container}>
        <View style={styles.firstView}>
            <Image source={user?.avatar === null ? require('../../assets/images/default_avatar.jpg') :{uri: user.avatar}} style = {styles.avatar}/>
            <View style={{ marginStart: 10 }}>
                <Text style={styles.username}>
                    {user.username}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 3}}>
                    <Ionicons name='earth' size={16} color='#6b6b6b' style={{ marginTop: 3 }}/>
                    <Text style={{ fontSize: 16, color: '#6b6b6b', marginStart: 2}}>
                        Công khai
                    </Text>
                </View>
            </View>
        </View>
        <View style={isActive? styles.editViewFocus: styles.editView}>
            <TextInput
                numberOfLines={9}
                label= {'\tBạn có thêm tiểu sử ngắn để cho mọi người biết thêm\n  về bản thân mình. Hãy thêm bất cứ thứ gì bạn muốn \n\n\n'}
                variant="standard"
                multiline={true}
                textAlignVertical = 'top'
                color='#1a53ff'
                style ={{paddingTop: 20}}
                onFocus={()=>setActive(true)}
                helperText = {desLen + '/101' }
                onChangeText={(text) => {setDesLen(text.length), setDescription(text)}}
                maxLength = {101}
            />
        </View>
    </View>
}


export default EditDescription;