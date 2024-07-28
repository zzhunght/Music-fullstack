import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStyles } from './style'
import { ScrollView } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import { useThemeColor } from '../../hooks/useThemeColor'
import { TextCustom } from '../Text/TextCustome'
import { useGetUserInfoQuery } from '../../api/user'
import { useCreateCommentMutation, useGetSongCommentsQuery } from '../../api/comment'
import { Song } from '../../interface'
import { GetDefaultAvatar } from '../../constants'
import moment from 'moment'



const Comment = ({song}: {song: Song}) => {
    const theme = useThemeColor()
    const { data: user } = useGetUserInfoQuery()
    const {data: comments} = useGetSongCommentsQuery(song.id)
    const [comment, commentResult] = useCreateCommentMutation()
    const styles = createStyles(theme)
    const [form, setForm] = useState("")

    useEffect(() => {
        // console.log("comment rs data : ", commentResult.data)
        // console.log("comment rs error : ", commentResult.error)
        if(commentResult.data){
            setForm("")
        }
    },[commentResult])
    return (
        <View style={{
            backgroundColor: theme.background
        }}>
            {user && (
                <View style={{
                    borderBottomWidth: 0.25,
                    borderBottomColor: theme.border,
                    padding: 5,
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <FastImage 
                        style={styles.avatar}
                        source={GetDefaultAvatar(user.id)}
                    />
                    <TextInput
                        value={form}
                        onChangeText={text => setForm(text)}
                        onSubmitEditing={()=>{
                            comment({
                                song_id: song.id,
                                content: form,
                            })
                        }}
                        style={{
                            height: 40,
                            flex: 1,
                            backgroundColor: theme.sheetBgColor,
                            borderRadius: 6,
                            paddingLeft: 15
                        }}
                        placeholder='Bạn đang nghĩ gì'
                    />
                </View>
            )}
            <View style={styles.comment_scroll}>
                {comments?.map(i => (
                    <View style={styles.comment} key={i.id.toString()}>
                        <FastImage
                            style={styles.avatar}
                            source={GetDefaultAvatar(i.user_id)}
                        />
                        <View style={styles.comment_detail}>
                            <TextCustom style={styles.name}>
                                {i.name}
                                <TextCustom style={styles.time}> • {moment(i.created_at).fromNow()}</TextCustom>
                            </TextCustom>
                            <TextCustom style={styles.text}>{i.content}</TextCustom>

                        </View>
                    </View>
                ))}
            </View>

        </View>
    )
}

export default Comment