'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType, api } from '@/services/api'
import { CategoryType } from '@/types/category'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select'
import { sportsItemType } from '@/types/sportsItem'
import { useEffect, useState, useCallback } from 'react'

interface FormFieldsSportsItemProps {
  sportsItem?: sportsItemType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
  isPending?: boolean
}

export default function FormFieldsSportsItem({
  sportsItem,
  readOnly,
  error,
  isPending = false,
}: FormFieldsSportsItemProps) {
  const [updateImage, setUpdateImage] = useState<string | undefined>(sportsItem?.image)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    sportsItem?.category ?? null,
  )
  const [categories, setCategories] = useState<CategoryType[]>([])

  const loadCategories = useCallback(async () => {
    const { response, error } = await api('GET', '/category')
    if (response) {
      setCategories(response as CategoryType[])
    } else {
      console.error(error?.message)
    }
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  useEffect(() => {
    if (sportsItem?.image) {
      setUpdateImage(sportsItem.image)
    }
    if (sportsItem?.category) {
      setSelectedCategory(sportsItem.category)
    }
  }, [sportsItem])

  const handleImageChangeLocal = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUpdateImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
    handleImageChange(e, setUpdateImage)
  }, [])

  const handleCategoryChange = useCallback((value: string) => {
    const category = categories.find(cat => cat.id === value) || null
    setSelectedCategory(category)
  }, [categories])

  return (
    <>
      <FormFieldsGroup>
        {sportsItem && <Input defaultValue={sportsItem.id} type="text" name="id" hidden />}

        <FormField>
          <Label htmlFor="image" required={!sportsItem}>
            Imagem
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={isPending}
            hidden={readOnly}
            onChange={handleImageChangeLocal}
            error={error?.errors?.image}
          />
          {updateImage && (
            <div className="mt-2 flex justify-center w-full">
              <ImageForm className="aspect-square size-40" src={updateImage} />
            </div>
          )}
        </FormField>

        <FormField>
          <Label htmlFor="name" required>Nome</Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira o nome do artigo esportivo"
            defaultValue={sportsItem?.name || ''}
            disabled={isPending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>

        <FormField>
          <Label htmlFor="brand" required>Marca</Label>
          <Input
            name="brand"
            id="brand"
            placeholder="Insira a marca do artigo esportivo"
            defaultValue={sportsItem?.brand || ''}
            disabled={isPending}
            readOnly={readOnly}
            error={error?.errors?.brand}
          />
        </FormField>

        <FormField>
          <Label htmlFor="price" required>Preço</Label>
          <Input
            name="price"
            id="price"
            placeholder="Insira o preço do artigo esportivo"
            defaultValue={sportsItem?.price || ''}
            disabled={isPending}
            readOnly={readOnly}
            error={error?.errors?.price}
            type="number"
            step="0.01"
            min="0"
          />
        </FormField>

        <FormField>
          <Label htmlFor="year" required={!sportsItem}>Ano</Label>
          <Input
            name="year"
            id="year"
            maxLength={4}
            placeholder="Insira o ano de lançamento do artigo esportivo"
            defaultValue={sportsItem?.year || ''}
            disabled={isPending}
            readOnly={readOnly}
            error={error?.errors?.year}
            type="number"
            min="1900"
            max={new Date().getFullYear()}
          />
        </FormField>

        <FormField>
          <Label htmlFor="amount" required={!sportsItem}>Quantidade</Label>
          <Input
            name="amount"
            id="amount"
            placeholder="Insira a quantidade do artigo esportivo"
            defaultValue={sportsItem?.amount || ''}
            disabled={isPending}
            readOnly={readOnly}
            error={error?.errors?.amount}
            type="number"
            min="0"
          />
        </FormField>

        <FormField>
          <Label htmlFor="category_id" required={!sportsItem}>Categoria</Label>
          <Input id="category_id" name="category_id" type="hidden" value={selectedCategory?.id || ''} />
          <Select
            value={selectedCategory?.id}
            onValueChange={handleCategoryChange}
            disabled={isPending || readOnly}
          >
            <SelectTrigger id="category_id_select" className="col-span-3">
              <SelectValue placeholder="Selecione a categoria do artigo esportivo" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </FormFieldsGroup>

      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogFooter>
    </>
  )
}