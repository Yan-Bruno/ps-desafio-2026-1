<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productsByCategory = [
            'Capacetes' => [
                ['name' => 'LS2 FF358 Strobe', 'brand' => 'LS2'],
                ['name' => 'Norisk FF300', 'brand' => 'Norisk'],
                ['name' => 'Pro Tork Evo', 'brand' => 'Pro Tork'],
                ['name' => 'Bell Qualifier DLX', 'brand' => 'Bell'],
                ['name' => 'HJC C10', 'brand' => 'HJC'],
                ['name' => 'LS2 FF370 Arrow', 'brand' => 'LS2'],
                ['name' => 'Norisk FF350', 'brand' => 'Norisk'],
                ['name' => 'Pro Tork Liberty', 'brand' => 'Pro Tork'],
            ],
            'Bolas' => [
                ['name' => 'Penalty Max 1000', 'brand' => 'Penalty'],
                ['name' => 'Nike Premier League', 'brand' => 'Nike'],
                ['name' => 'Adidas UCL Pro', 'brand' => 'Adidas'],
                ['name' => 'Topper S10', 'brand' => 'Topper'],
                ['name' => 'Wilson NCAA', 'brand' => 'Wilson'],
                ['name' => 'Spalding NBA', 'brand' => 'Spalding'],
                ['name' => 'Penalty S11', 'brand' => 'Penalty'],
                ['name' => 'Nike Flight', 'brand' => 'Nike'],
            ],
            'Chuteiras' => [
                ['name' => 'Nike Mercurial Superfly 9', 'brand' => 'Nike'],
                ['name' => 'Adidas Predator Accuracy', 'brand' => 'Adidas'],
                ['name' => 'Puma Future 7', 'brand' => 'Puma'],
                ['name' => 'Umbro Speciali', 'brand' => 'Umbro'],
                ['name' => 'New Balance Furon V7', 'brand' => 'New Balance'],
                ['name' => 'Nike Phantom GX', 'brand' => 'Nike'],
                ['name' => 'Adidas X Crazyfast', 'brand' => 'Adidas'],
                ['name' => 'Puma Ultra Ultimate', 'brand' => 'Puma'],
            ],
            'Raquetes' => [
                ['name' => 'Head Gravity MP', 'brand' => 'Head'],
                ['name' => 'Babolat Pure Drive', 'brand' => 'Babolat'],
                ['name' => 'Wilson Clash 100', 'brand' => 'Wilson'],
                ['name' => 'Yonex Ezone 100', 'brand' => 'Yonex'],
                ['name' => 'Prince Textreme', 'brand' => 'Prince'],
                ['name' => 'Head Speed MP', 'brand' => 'Head'],
                ['name' => 'Babolat Pure Aero', 'brand' => 'Babolat'],
                ['name' => 'Wilson Blade 98', 'brand' => 'Wilson'],
            ],
            'Luvas de Goleiro' => [
                ['name' => 'Penalty Graphite', 'brand' => 'Penalty'],
                ['name' => 'Adidas Predator', 'brand' => 'Adidas'],
                ['name' => 'Nike VG3', 'brand' => 'Nike'],
                ['name' => 'Umbro Neo Pro', 'brand' => 'Umbro'],
                ['name' => 'Reusch Pure Contact', 'brand' => 'Reusch'],
                ['name' => 'Penalty P2', 'brand' => 'Penalty'],
                ['name' => 'Adidas Ace', 'brand' => 'Adidas'],
                ['name' => 'Nike Vapor Grip', 'brand' => 'Nike'],
            ],
            'Camisas de Time' => [
                ['name' => 'Brasil Torcedor 2025', 'brand' => 'Nike'],
                ['name' => 'Flamengo I 2024', 'brand' => 'Adidas'],
                ['name' => 'Corinthians I 2025', 'brand' => 'Nike'],
                ['name' => 'Argentina Campeã', 'brand' => 'Adidas'],
                ['name' => 'Real Madrid I 2025', 'brand' => 'Adidas'],
                ['name' => 'Barcelona I 2025', 'brand' => 'Nike'],
                ['name' => 'Palmeiras I 2024', 'brand' => 'Puma'],
                ['name' => 'São Paulo I 2025', 'brand' => 'New Balance'],
            ],
            'Tênis Esportivos' => [
                ['name' => 'Nike Air Max 90', 'brand' => 'Nike'],
                ['name' => 'Adidas Ultraboost 22', 'brand' => 'Adidas'],
                ['name' => 'Olympikus Corre 4', 'brand' => 'Olympikus'],
                ['name' => 'Asics Gel-Kayano 30', 'brand' => 'Asics'],
                ['name' => 'Mizuno Wave Inspire 19', 'brand' => 'Mizuno'],
                ['name' => 'Nike Revolution 6', 'brand' => 'Nike'],
                ['name' => 'Adidas Duramo', 'brand' => 'Adidas'],
                ['name' => 'Olympikus Inverse', 'brand' => 'Olympikus'],
            ],
            'Mochilas Esportivas' => [
                ['name' => 'Nike Brasilia', 'brand' => 'Nike'],
                ['name' => 'Adidas Defender III', 'brand' => 'Adidas'],
                ['name' => 'Under Armour Hustle', 'brand' => 'Under Armour'],
                ['name' => 'Puma Phase', 'brand' => 'Puma'],
                ['name' => 'Everlast Backpack', 'brand' => 'Everlast'],
                ['name' => 'Nike Heritage', 'brand' => 'Nike'],
                ['name' => 'Adidas Stadium', 'brand' => 'Adidas'],
                ['name' => 'Puma Evercat', 'brand' => 'Puma'],
            ],
            'Joelheiras' => [
                ['name' => 'Asics Gel Líquido', 'brand' => 'Asics'],
                ['name' => 'Mueller Hg80', 'brand' => 'Mueller'],
                ['name' => 'McDavid Hex', 'brand' => 'McDavid'],
                ['name' => 'Vulkan Premium', 'brand' => 'Vulkan'],
                ['name' => 'Nike Pro', 'brand' => 'Nike'],
                ['name' => 'Adidas Techfit', 'brand' => 'Adidas'],
                ['name' => 'Under Armour Armour', 'brand' => 'Under Armour'],
                ['name' => 'Reusch Protect', 'brand' => 'Reusch'],
            ],
            'Caneleiras' => [
                ['name' => 'Nike J Guard', 'brand' => 'Nike'],
                ['name' => 'Adidas X League', 'brand' => 'Adidas'],
                ['name' => 'Puma Ultra', 'brand' => 'Puma'],
                ['name' => 'Umbro Pro', 'brand' => 'Umbro'],
                ['name' => 'Penalty Shield', 'brand' => 'Penalty'],
                ['name' => 'Nike Mercurial', 'brand' => 'Nike'],
                ['name' => 'Adidas Predator', 'brand' => 'Adidas'],
                ['name' => 'Puma One', 'brand' => 'Puma'],
            ],
            'Camisas de Treino' => [
                ['name' => 'Nike Dri-FIT', 'brand' => 'Nike'],
                ['name' => 'Adidas Own The Run', 'brand' => 'Adidas'],
                ['name' => 'Under Armour Rush', 'brand' => 'Under Armour'],
                ['name' => 'Puma Run', 'brand' => 'Puma'],
                ['name' => 'Mizuno Drylite', 'brand' => 'Mizuno'],
            ],
            'Shorts Esportivos' => [
                ['name' => 'Nike Flex', 'brand' => 'Nike'],
                ['name' => 'Adidas Aeroready', 'brand' => 'Adidas'],
                ['name' => 'Under Armour Launch', 'brand' => 'Under Armour'],
                ['name' => 'Puma Team', 'brand' => 'Puma'],
                ['name' => 'Mizuno Run', 'brand' => 'Mizuno'],
            ],
            'Meias Esportivas' => [
                ['name' => 'Nike Elite', 'brand' => 'Nike'],
                ['name' => 'Adidas Copa', 'brand' => 'Adidas'],
                ['name' => 'Puma Liga', 'brand' => 'Puma'],
                ['name' => 'Umbro Pro', 'brand' => 'Umbro'],
                ['name' => 'Penalty Max', 'brand' => 'Penalty'],
            ],
            'Óculos de Proteção' => [
                ['name' => 'Oakley Radar EV', 'brand' => 'Oakley'],
                ['name' => 'Adidas Zonyk', 'brand' => 'Adidas'],
                ['name' => 'Puma Evolve', 'brand' => 'Puma'],
                ['name' => 'Nike Show X2', 'brand' => 'Nike'],
                ['name' => 'Under Armour Igniter', 'brand' => 'Under Armour'],
            ],
            'Pulseiras Esportivas' => [
                ['name' => 'Nike Training', 'brand' => 'Nike'],
                ['name' => 'Adidas Performance', 'brand' => 'Adidas'],
                ['name' => 'Under Armour Stride', 'brand' => 'Under Armour'],
                ['name' => 'Puma Run', 'brand' => 'Puma'],
                ['name' => 'Asics Grip', 'brand' => 'Asics'],
            ],
            'Bicicletas' => [
                ['name' => 'Caloi Strada Racing', 'brand' => 'Caloi'],
                ['name' => 'Oggi Hacker Pro', 'brand' => 'Oggi'],
                ['name' => 'Soul GT 29', 'brand' => 'Soul'],
                ['name' => 'Specialized Rockhopper', 'brand' => 'Specialized'],
                ['name' => 'Trek Marlin', 'brand' => 'Trek'],
            ],
            'Skates' => [
                ['name' => 'Circle Drop', 'brand' => 'Circle'],
                ['name' => 'Mad Hefesto', 'brand' => 'Mad'],
                ['name' => 'Element Section', 'brand' => 'Element'],
                ['name' => 'Santa Cruz Classic', 'brand' => 'Santa Cruz'],
                ['name' => 'Primitive Pro', 'brand' => 'Primitive'],
            ],
            'Patins' => [
                ['name' => 'Traxder Alpha', 'brand' => 'Traxder'],
                ['name' => 'K2 Kinetic', 'brand' => 'K2'],
                ['name' => 'Rollerblade Zetrablade', 'brand' => 'Rollerblade'],
                ['name' => 'Oxer MFX', 'brand' => 'Oxer'],
                ['name' => 'Powerslide Phuzion', 'brand' => 'Powerslide'],
            ],
        ];

        // Get a random category
        $category = Category::inRandomOrder()->first();
        
        if (!$category) {
            $category = Category::factory()->create();
        }

        // Get products for this category
        $products = $productsByCategory[$category->name] ?? $productsByCategory['Capacetes'];
        
        // Select random product
        $product = $this->faker->randomElement($products);

        return [
            'name' => $product['name'],
            'brand' => $product['brand'],
            'price' => $this->faker->randomFloat(2, 29.90, 1499.90),
            'launch_year' => $this->faker->numberBetween(2020, 2025),
            'image' => $this->faker->imageUrl(640, 480, 'sports', true),
            'category_id' => $category->id,
            'stock_quantity' => $this->faker->numberBetween(0, 100),
        ];
    }
}