'use client'

import { destroyCategory } from '@/actions/category'
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

interface DialogCategoryDeleteProps {
  id: string
  children: React.ReactNode
  onSuccess?: (id: string) => void
}

export function DialogCategoryDelete({ id, children, onSuccess }: DialogCategoryDeleteProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const submit = async () => {
    setIsDeleting(true)

    try {
      const result = JSON.parse(await destroyCategory(id))

      if (result.error) {
        toast({
          title: 'Erro',
          description: result.error.message || 'Não foi possível excluir a categoria!',
          variant: 'destructive',
        })
        setIsDeleting(false)
      } else {
        toast({
          title: 'Sucesso',
          description: 'Categoria deletada com sucesso!',
        })
        setOpen(false)
        setIsDeleting(false)
        onSuccess?.(id)
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao tentar excluir a categoria!',
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
          <DialogTitle>Confirmar exclusão de categoria</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir esta categoria? Esta ação é
            irreversível e removerá permanentemente a categoria do sistema.
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