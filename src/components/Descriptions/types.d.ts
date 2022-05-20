export interface TagType {
  type?: string
  color?: string
  size?: 'large' | 'small' | 'default'
  effect?: 'dark' | 'light' | 'plain'
  hit?: boolean
  disableTransitions?: boolean
}

export interface FieldType {
  link?: string
  text?: string
  type?: 'primary ' | ' success ' | ' warning ' | ' danger ' | ' info'
}

export interface DescItem {
  label: string
  field: FieldType | string
  tag?: TagType
  icon?: string
  iconSize?: number
  iconColor?: string
  attrs?: {
    [key: string]: string | number
  }
}
