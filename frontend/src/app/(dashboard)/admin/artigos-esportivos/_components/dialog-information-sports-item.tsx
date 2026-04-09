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
import { sportsItemType } from '@/types/sportsItem'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationSportsItemProps {
  id: string
  children: React.ReactNode
}

export function DialogInformationSportsItem({ id, children }: DialogInformationSportsItemProps) {
  const [sportsItem, setSportsItem] = useState<sportsItemType | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setSportsItem(null)
    }
  }

  useEffect(() => {
    if (!open) return

    const requestData = async () => {
      setLoading(true)
      const { response, error } = await api('GET', `/articles/${id}`)

      if (response) {
        setSportsItem(response as sportsItemType)
      } else {
        toast({
          title: 'Erro',
          description: error?.message || 'Artigo esportivo não encontrado!',
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
          <DialogTitle>Informações do artigo esportivo</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do artigo esportivo abaixo.
          </DialogDescription>
        </DialogHeader>
        {loading && <div>Carregando...</div>}
        {sportsItem && !loading && (
          <FormFieldsSportsItem sportsItem={sportsItem} readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}