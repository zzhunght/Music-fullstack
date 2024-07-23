import messaging from '@react-native-firebase/messaging';
import { useEffect } from "react"


const useNotification = () => {


    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log("New remote message from FCM :", remoteMessage);
        });
        
        return unsubscribe;
    }, []);

    useEffect(()=>{
        messaging().subscribeToTopic("public").then(()=>{
            console.log("Subscribed to topic Public successfully")
        }).catch((error) => {
            console.error("subscribed to topic Public failed : ", error.message)
        })
    },[])

}

export default useNotification;