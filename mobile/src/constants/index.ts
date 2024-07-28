
export const DEFAULT_SONG_BANNER = "https://as2.ftcdn.net/v2/jpg/02/67/57/55/1000_F_267575534_JPXugHteIfuhOlt0tboxWre6hzM3FsfO.jpg"


export const DEFAULT_AVATAR = require("../assets/images/default_avatar.jpg")

export const DEFAULT_AVATARS = [
    require("../assets/images/default_avatar.jpg"),
    require("../assets/images/default_avatar/1.webp"),
    require("../assets/images/default_avatar/2.webp"),
    require("../assets/images/default_avatar/3.png"),
    require("../assets/images/default_avatar/4.jpg"),
    require("../assets/images/default_avatar/5.png"),
    require("../assets/images/default_avatar/6.jpg"),
    require("../assets/images/default_avatar/7.webp"),
    require("../assets/images/default_avatar/8.jpg"),
    require("../assets/images/default_avatar/9.png"),
]

export const GetDefaultAvatar = (id?: number) =>{
    if(!id) return DEFAULT_AVATARS[0]
    const index = id % DEFAULT_AVATARS.length
    return DEFAULT_AVATARS[index];
}