'use client'

import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { sportsItemType } from '@/types/sportsItem'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateSportsItem } from './dialog-update-sports-item'
import { DialogSportsItemDelete } from './dialog-delete-sports-item'
import { DialogInformationSportsItem } from './dialog-information-sports-item'
import { DialogCreateSportsItem } from './dialog-create-sports-item'
import { useEffect, useState, useCallback } from 'react'

export default function ListSportsItems() {
  const [sportsItems, setSportsItems] = useState<sportsItemType[]>([])
  const [loading, setLoading] = useState(true)

  const loadSportsItems = useCallback(async () => {
    setLoading(true)
    const { response, error } = await api('GET', '/articles')
    if (response) {
      setSportsItems(response as sportsItemType[])
    } else {
      console.error(error?.message)
    }
    setLoading(false)
  }, [])

  const updateSportsItemInList = useCallback((updatedItem: sportsItemType) => {
    setSportsItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item))
  }, [])

  const addSportsItemToList = useCallback((newItem: sportsItemType) => {
    setSportsItems(prev => [newItem, ...prev])
  }, [])

  const removeSportsItemFromList = useCallback((id: string) => {
    setSportsItems(prev => prev.filter(item => item.id !== id))
  }, [])

  useEffect(() => {
    loadSportsItems()
  }, [loadSportsItems])

  if (loading) {
    return <DashboardContainer>Carregando artigos esportivos...</DashboardContainer>
  }

  if (sportsItems.length === 0) {
    return (
      <DashboardContainer className="text-muted-foreground">
        Nenhum artigo esportivo encontrado.
      </DashboardContainer>
    )
  }

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateSportsItem onSuccess={addSportsItemToList}>
          <Button size="sm">
            <LuPlusCircle />
            Novo artigo esportivo
          </Button>
        </DialogCreateSportsItem>
      </DashboardContainer>

      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sportsItems.map(sportsItem => (
              <TableRow key={sportsItem.id}>
                <TableCell>
                  {sportsItem.image && (
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img
                        src={sportsItem.image}
                        alt={sportsItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>{sportsItem.name}</TableCell>
                <TableCell>{sportsItem.brand}</TableCell>
                <TableCell>{sportsItem.price}</TableCell>
                <TableCell>{sportsItem.year}</TableCell>
                <TableCell>{sportsItem.amount}</TableCell>
                <TableCell>{sportsItem.category?.name || 'Sem categoria'}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationSportsItem id={sportsItem.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationSportsItem>
                  <DialogUpdateSportsItem id={sportsItem.id} onSuccess={updateSportsItemInList}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateSportsItem>
                  <DialogSportsItemDelete id={sportsItem.id} onSuccess={removeSportsItemFromList}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogSportsItemDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {sportsItems.length === 0 && (
          <TableCaption>Nenhum artigo esportivo encontrado.</TableCaption>
        )}
      </DashboardContainer>
    </>
  )
}