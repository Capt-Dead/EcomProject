<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserAddressTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    // public function test_create_address(): void
    // {
    //     $user = new User();
    //     $data = [
    //         'user_id'       => '1',
    //         'address_line1' => fake()->name(),
    //         'address_line2' => fake()->name(),
    //         'city'          => fake()->name(),
    //         'postal_code'   => fake()->name(),
    //         'country'       => fake()->name(),
    //         'mobile_no'     => fake()->name(),
    //     ];
    //     $response = $this->post('/api/user-address', $data);
    //     $response->assertStatus(201)
    //         ->assertJson([
    //             ...$data,
    //         ]);
    // }
}
