import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

export const durationToTime = (duration: number): string => {
    if (!duration) return ''
    const minute = Math.floor(duration / 60)
    const second = Math.floor(duration % 60)
    return `${minute}:${second < 10 ? '0' : ''}${second}`
}
export const isErrorWithData = (error: unknown): error is { data: { error: string } } => {
    return typeof error === 'object' && error !== null && 'data' in error;
};