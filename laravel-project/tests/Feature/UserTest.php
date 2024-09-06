<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Validation\Rules\Unique;
use Tests\TestCase;

use function PHPUnit\Framework\assertJson;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    // public function test_create_user(): void
    // {
    //     $data = [
    //         'name' => 'John Seifhred Carza',
    //         'email' => 'john@email.com',
    //         'password' => 'password',

    //         // 'address_line1' => 'address_line1',
    //         // 'address_line2' => 'address_line2',
    //         // 'city'          => 'city',
    //         // 'postal_code'   => 'postal_code',
    //         // 'country'       => 'country',
    //         // 'mobile_no'     => 'mobile_no',
    //     ];
    //     $response = $this->post('api/register', $data);
    //     unset($data['password']);
    //     $response->assertStatus(201);
    //     // ->assertJson([
    //     //     ...$data,
    //     //     // 'created_at' => now(),
    //     //     // 'updated_at' => now(),
    //     // ]);
    // }

    // public function test_get_user(): void
    // {
    //     $response = $this->get('api/user');
    //     $response->assertStatus(200)
    //         ->assertJson([]);
    // }
}
