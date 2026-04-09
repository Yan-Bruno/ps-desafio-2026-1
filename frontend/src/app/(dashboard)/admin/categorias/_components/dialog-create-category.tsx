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
import { createCategory } from '@/actions/category'
import { useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'
import { CategoryType } from '@/types/category'

interface DialogCreateCategoryProps {
  children: React.ReactNode
  onSuccess?: (newCategory: CategoryType) => void
}

export function DialogCreateCategory({ children, onSuccess }: DialogCreateCategoryProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  const submit = async (form: FormData) => {
    setIsCreating(true)

    const result = JSON.parse(await createCategory(form))

    if (result.error) {
      setError(result.error)
      toast({
        title: 'Erro',
        description: result.error.message || 'Não foi possível criar a categoria!',
        variant: 'destructive',
      })
      setIsCreating(false)
    } else {
      toast({
        title: 'Sucesso',
        description: 'Categoria criada com sucesso!',
      })

      // Pega a nova categoria da resposta
      const newCategory = result.response as CategoryType

      setOpen(false)
      setError(null)
      setIsCreating(false)

      // Chama o callback com a nova categoria
      onSuccess?.(newCategory)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova categoria</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar uma nova categoria.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsCategory error={error} isPending={isCreating} />
        </form>
      </DialogContent>
    </Dialog>
  )
}