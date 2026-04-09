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
import { createArticles } from '@/actions/articles'
import { filterFormData } from '@/services/filter-form-data'
import { useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType, api } from '@/services/api'
import { sportsItemType } from '@/types/sportsItem'

interface DialogCreateSportsItemProps {
  children: React.ReactNode
  onSuccess?: (newItem: sportsItemType) => void
}

export function DialogCreateSportsItem({ children, onSuccess }: DialogCreateSportsItemProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  const submit = async (form: FormData) => {
    setIsCreating(true)
    const newForm = await filterFormData(form)

    const resultString = await createArticles(newForm)
    const result = JSON.parse(resultString)

    if (result.error) {
      setError(result.error)
      toast({
        title: 'Erro',
        description: result.error.message || 'Não foi possível criar o artigo esportivo!',
        variant: 'destructive',
      })
      setIsCreating(false)
    } else {
      toast({
        title: 'Sucesso',
        description: 'Artigo esportivo criado com sucesso!',
      })

      const newItem = result.response as sportsItemType

      setOpen(false)
      setError(null)
      setIsCreating(false)
      onSuccess?.(newItem)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar novo artigo esportivo</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar um novo artigo esportivo.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsSportsItem error={error} isPending={isCreating} />
        </form>
      </DialogContent>
    </Dialog>
  )
}