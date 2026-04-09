'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createArticles(form: FormData) {
    const res = await api('POST', '/articles', { data: form })

    if (!res.error) {
        revalidatePath('/admin/artigos-esportivos')
    }

    return JSON.stringify(res)
}

export async function updateArticles(form: FormData) {
    const id = form.get('id') as string
    const res = await api('PUT', `/articles/${id}`, {
        data: form,
    })  
    
    if (!res.error) {
        revalidatePath('/admin/artigos-esportivos')
    }
    
    return JSON.stringify(res)
}

export async function destroyArticles(id: string) { 
    const res = await api('DELETE', `/articles/${id}`)

    if (!res.error) {
        revalidatePath('/admin/artigos-esportivos')
    }
    
    return JSON.stringify(res)
}