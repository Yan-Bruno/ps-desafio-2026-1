<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateArticlesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'brand' => 'sometimes|string|max:255',
            'price' => 'sometimes|float|min:0',
            'year' => 'sometimes|integer|min:1900|max:' . (date('Y') + 5),
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'amount' => 'sometimes|integer|min:0',
            'category_id' => 'sometimes|exists:categories,id'
        ];
    }
    
    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.max' => 'O nome não pode ter mais que 255 caracteres.',
            'price.numeric' => 'O preço deve ser um valor numérico.',
            'price.min' => 'O preço não pode ser negativo.',
            'year.integer' => 'O ano deve ser um número inteiro.',
            'year.min' => 'O ano deve ser maior ou igual a 1900.',
            'year.max' => 'O ano não pode ser maior que ' . (date('Y') + 5) . '.',
            'image.image' => 'O arquivo deve ser uma imagem.',
            'image.mimes' => 'A imagem deve ser do tipo: jpeg, png, jpg, gif.',
            'amount.integer' => 'A quantidade deve ser um número inteiro.',
            'amount.min' => 'A quantidade não pode ser negativa.',
            'category_id.exists' => 'A categoria selecionada não existe.'
        ];
    }
}