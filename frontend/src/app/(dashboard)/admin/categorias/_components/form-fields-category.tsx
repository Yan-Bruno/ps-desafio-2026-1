'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { CategoryType } from '@/types/category'

interface FormFieldsCategoryProps {
  category?: CategoryType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
  isPending?: boolean
}

export default function FormFieldsCategory({
  category,
  readOnly,
  error,
  isPending = false,
}: FormFieldsCategoryProps) {
  return (
    <>
      <FormFieldsGroup>
        {/* SÓ MOSTRA O INPUT HIDDEN SE FOR EDIÇÃO */}
        {category?.id && (
          <input type="hidden" name="id" value={category.id} />
        )}

        <FormField>
          <Label htmlFor="name" required={!category}>
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira o nome da categoria"
            defaultValue={category?.name || ''}
            disabled={isPending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
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