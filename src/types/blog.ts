export interface PostItem {
  cover: string
  created_at: number
  id: number
  title: string
}

export type Post = {
  body: string
} & PostItem
