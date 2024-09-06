<?php

namespace Tests\Feature;

use App\Models\ProductCategories;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductCatTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    // public function test_create_category(): void
    // {
    //     $data = [
    //         'name'  => fake()->word(),
    //         'desc'  => fake()->paragraph(1),

    //     ];
    //     $response = $this->post('/api/category', $data);
    //     $response->assertStatus(201)
    //         ->assertJson($data);
    // }

    // public function test_show_category(): void
    // {
    //     $response = $this->get('api/category/16');
    //     $response->assertStatus(200)
    //         ->assertJson([]);
    // }

    // public function test_update_category(): void
    // {
    //     $data = [
    //         'name' => fake()->word(),
    //         'desc' => 'Shorts',
    //     ];
    //     $response = $this->put('api/category/9', $data);
    //     $response->assertStatus(200);
    // }

    // public function test_delete_category(): void
    // {
    //     $response = $this->delete('api/category/30');
    //     $response->assertStatus(200);
    // }
}
