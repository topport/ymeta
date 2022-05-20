// Lock screen information
export interface UserInfo {
  userId: string | number
  username: string
  realName: string
  avatar: string
  desc?: string
  roles: RoleInfo[]
}
