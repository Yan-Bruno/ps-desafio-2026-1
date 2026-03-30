<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Capacetes',
            'Bolas',
            'Chuteiras',
            'Raquetes',
            'Luvas de Goleiro',
            'Camisas de Time',
            'Tênis Esportivos',
            'Mochilas Esportivas',
            'Joelheiras',
            'Caneleiras',
            'Camisas de Treino',
            'Shorts Esportivos',
            'Meias Esportivas',
            'Óculos de Proteção',
            'Pulseiras Esportivas',
            'Bicicletas',
            'Skates',
            'Patins',
        ];

        return [
            'name' => $this->faker->unique()->randomElement($categories),
        ];
    }
}