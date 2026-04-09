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
import { CategoryType } from '@/types/category'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationCategoryProps {
  id: string
  children: React.ReactNode
}

export function DialogInformationCategory({ id, children }: DialogInformationCategoryProps) {
  const [category, setCategory] = useState<CategoryType | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setCategory(null)
    }
  }

  useEffect(() => {
    if (!open) return
    setCategory(null)

    const requestData = async () => {
      setLoading(true)
      const { response, error } = await api('GET', `/category/${id}`)

      if (response) {
        setCategory(response as CategoryType)
      } else {
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da categoria</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas da categoria abaixo.
          </DialogDescription>
        </DialogHeader>
        {loading && <div>Carregando...</div>}
        {category && !loading && (
          <FormFieldsCategory category={category} readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}