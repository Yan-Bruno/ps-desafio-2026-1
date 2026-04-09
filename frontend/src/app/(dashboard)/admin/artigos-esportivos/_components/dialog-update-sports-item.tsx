'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsSportsItem from './form-fields-sports-item'
import { updateArticles } from '@/actions/articles'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState, useCallback } from 'react'
import { useToast } from '@/components/use-toast'
import { sportsItemType } from '@/types/sportsItem'
import { ResponseErrorType, api } from '@/services/api'
import { CategoryType } from '@/types/category'

interface DialogUpdateSportsItemProps {
  id: string
  children: React.ReactNode
  onSuccess?: (updatedItem: sportsItemType) => void
}

export function DialogUpdateSportsItem({ id, children, onSuccess }: DialogUpdateSportsItemProps) {
  const [sportsItem, setSportsItem] = useState<sportsItemType | null>(null)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchSportsItem = useCallback(async () => {
    setLoading(true)
    const { response, error } = await api<sportsItemType>('GET', `/articles/${id}`)
    if (response) {
      setSportsItem(response)
    } else {
      setSportsItem(null)
      toast({
        title: 'Erro',
        description: error?.message || 'Artigo esportivo não encontrado!',
        variant: 'destructive',
      })
      setOpen(false)
    }
    setLoading(false)
  }, [id, toast])

  useEffect(() => {
    if (open) {
      fetchSportsItem()
    }
  }, [open, fetchSportsItem])

  const fetchCategory = useCallback(async (categoryId: string) => {
    const { response } = await api<CategoryType>('GET', `/category/${categoryId}`)
    if (response && typeof response === 'object' && 'name' in response && 'id' in response) {
      return { name: response.name, id: response.id }
    }
    return { name: '', id: categoryId }
  }, [])

  const getImageUrl = useCallback((form: FormData, currentImage: string | undefined) => {
    const imageFile = form.get('image') as File
    if (imageFile && imageFile.size > 0 && imageFile.name) {
      return URL.createObjectURL(imageFile)
    }
    return currentImage || ''
  }, [])

  const submit = async (form: FormData) => {
    form.append('id', id)
    const newForm = await filterFormData(form)
    const resultString = await updateArticles(newForm)
    const result = JSON.parse(resultString)

    if (result.error) {
      setError(result.error)
      toast({
        title: 'Erro',
        description: result.error.message || 'Não foi possível editar o artigo esportivo!',
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Sucesso',
      description: 'Artigo esportivo editado com sucesso!',
    })

    const categoryId = form.get('category_id') as string
    const { name: categoryName, id: categoryIdFinal } = await fetchCategory(categoryId)
    const imageUrl = getImageUrl(form, sportsItem?.image)

    const updatedItem: sportsItemType = {
      id: sportsItem?.id || id,
      name: form.get('name') as string,
      brand: form.get('brand') as string,
      price: Number(form.get('price')),
      year: Number(form.get('year')),
      amount: Number(form.get('amount')),
      image: imageUrl,
      category: { id: categoryIdFinal, name: categoryName }
    }

    setOpen(false)
    onSuccess?.(updatedItem)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar artigo esportivo</DialogTitle>
          <DialogDescription>
            Atualize as informações do artigo esportivo abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        {loading && <div>Carregando...</div>}
        {!loading && (
          <form action={submit}>
            <FormFieldsSportsItem error={error} sportsItem={sportsItem} />
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}