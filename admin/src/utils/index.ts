export function convertMinutesToHours(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    // Thêm số 0 ở phía trước nếu số phút nhỏ hơn 10
    const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    return `${hours}:${formattedMinutes}`;
}
