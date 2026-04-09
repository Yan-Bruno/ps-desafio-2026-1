'use client'

import { destroyArticles } from '@/actions/articles'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/dialog'
import { useToast } from '@/components/use-toast'
import { useState } from 'react'

interface DialogSportsItemDeleteProps {
  id: string
  children: React.ReactNode
  onSuccess?: (id: string) => void
}

export function DialogSportsItemDelete({ id, children, onSuccess }: DialogSportsItemDeleteProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const submit = async () => {
    setIsDeleting(true)

    try {
      const resultString = await destroyArticles(id)
      const result = JSON.parse(resultString)

      if (result.error) {
        toast({
          title: 'Erro',
          description: result.error.message || 'Não foi possível excluir o artigo esportivo!',
          variant: 'destructive',
        })
        setIsDeleting(false)
      } else {
        toast({
          title: 'Sucesso',
          description: 'Artigo esportivo deletado com sucesso!',
        })
        setOpen(false)
        setIsDeleting(false)
        onSuccess?.(id)
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao tentar excluir o artigo esportivo!',
        variant: 'destructive',
      })
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão de artigo esportivo</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este artigo esportivo? Esta ação é
            irreversível e removerá permanentemente o artigo do sistema.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={submit}
            disabled={isDeleting}
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}