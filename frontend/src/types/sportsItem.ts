export interface sportsItemType {
  id: string
  name: string
  brand: string
  price: number
  year: number
  amount: number
  image: string
  category: {
    id: string
    name: string
  }
  category_id?: string
  created_at?: string
  updated_at?: string
}