<?php

namespace Tests\Feature;

use App\Models\Products;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_create_product(): void
    {
        $user = User::find(1);

        // dd($user->id);

        $data = [
            // 'photo'           => fake()->image(),
            'name'            => fake()->word(),
            'user_id'         => $user->id,
            'descs'           => fake()->paragraph(1),
            'stock_inventory' => 500,
            'price'           => 500,
        ];

        $response = $this->post('api/product', $data);
        $response->assertStatus(201)
            ->assertJson($data);
    }

    // public function test_get_product(): void
    // {
    //     $response = $this->get('api/product/2');
    //     $response->assertStatus(200)
    //         ->assertJson([]);
    // }

    // public function test_update_product(): void
    // {
    //     $data = [
    //         'photo'           => fake()->image(),
    //         'name'            => fake()->word(),
    //         'desc'            => fake()->paragraph(1),
    //         'category_id'     => fake()->numberBetween(1, 5),
    //         'discount_id'     => fake()->numberBetween(0, 100),
    //         'stock_inventory' => 500,
    //         'price'           => 500,
    //     ];
    //     $response = $this->put('api/product/1', $data);
    //     $response->assertStatus(200);
    // }
}
