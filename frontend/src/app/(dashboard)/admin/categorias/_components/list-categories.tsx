'use client'

import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { CategoryType } from '@/types/category'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateCategory } from './dialog-update-category'
import { DialogCategoryDelete } from './dialog-delete-category'
import { DialogInformationCategory } from './dialog-information-category'
import { DialogCreateCategory } from './dialog-create-category'
import { useEffect, useState } from 'react'
import { api } from '@/services/api'

export default function ListCategory() {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(true)

  const loadCategories = async () => {
    setLoading(true)
    const { response, error } = await api('GET', '/category')
    if (response) {
      setCategories(response as CategoryType[])
    } else {
      console.error(error?.message)
    }
    setLoading(false)
  }

  // Atualiza a categoria na lista
  const handleUpdateCategory = (updatedCategory: CategoryType) => {
    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    )
  }

  // Adiciona nova categoria
  const handleCreateCategory = (newCategory: CategoryType) => {
    setCategories(prev => [newCategory, ...prev])
  }

  // Remove categoria
  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id))
  }

  useEffect(() => {
    loadCategories()
  }, [])

  if (loading) {
    return (
      <DashboardContainer>
        Carregando categorias...
      </DashboardContainer>
    )
  }

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateCategory onSuccess={handleCreateCategory}>
          <Button size="sm">
            <LuPlusCircle />
            Nova categoria
          </Button>
        </DialogCreateCategory>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationCategory id={category.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationCategory>
                  <DialogUpdateCategory
                    id={category.id}
                    onSuccess={handleUpdateCategory}
                  >
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateCategory>
                  <DialogCategoryDelete
                    id={category.id}
                    onSuccess={handleDeleteCategory}
                  >
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogCategoryDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DashboardContainer>
    </>
  )
}