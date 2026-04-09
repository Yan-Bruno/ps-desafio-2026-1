'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsCategory from './form-fields-category'
import { updateCategory } from '@/actions/category'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { CategoryType } from '@/types/category'
import { ResponseErrorType, api } from '@/services/api'

interface DialogUpdateCategoryProps {
  id: string
  children: React.ReactNode
  onSuccess?: (updatedCategory: CategoryType) => void
}

export function DialogUpdateCategory({ id, children, onSuccess }: DialogUpdateCategoryProps) {
  const [category, setCategory] = useState<CategoryType | null>(null)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const [loading, setLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) return
    setCategory(null)

    const requestData = async () => {
      setLoading(true)
      const { response, error } = await api('GET', `/category/${id}`)

      if (response) {
        setCategory(response as CategoryType)
      } else {
        setCategory(null)
        toast({
          title: 'Erro',
          description: error?.message || 'Categoria não encontrada!',
          variant: 'destructive',
        })
        setOpen(false)
      }
      setLoading(false)
    }

    requestData()
  }, [open, id, toast])

  const submit = async (form: FormData) => {
    setIsUpdating(true)

    form.append('id', id)

    const result = JSON.parse(await updateCategory(form))

    if (result.error) {
      setError(result.error)
      toast({
        title: 'Erro',
        description: result.error.message || 'Não foi possível editar a categoria!',
        variant: 'destructive',
      })
      setIsUpdating(false)
    } else {
      toast({
        title: 'Sucesso',
        description: 'Categoria editada com sucesso!',
      })

      // Pega a categoria atualizada
      const updatedCategory = {
        ...category,
        name: form.get('name') as string
      } as CategoryType

      setOpen(false)
      setError(null)
      setIsUpdating(false)

      // Chama o callback com a categoria atualizada
      onSuccess?.(updatedCategory)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar categoria</DialogTitle>
          <DialogDescription>
            Atualize as informações da categoria abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        {loading && <div>Carregando...</div>}
        {!loading && category && (
          <form action={submit}>
            <FormFieldsCategory error={error} category={category} isPending={isUpdating} />
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}