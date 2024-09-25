<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::beginTransaction();
        $user                 = new User();
        $user->name           = 'john';
        $user->email          = 'john@email.com';
        $user->password       = bcrypt('password');
        $user->isAdmin        = '1';
        $user->save();

        $address              = new UserAddress();
        $address->address     = "Address";
        $address->city        = "City";
        $address->postal_code = "Postal Code";
        $address->country     = "Country";
        $address->mobile_no   = "Mobile No.";

        $user->address()->save($address);
        DB::commit();
    }
}
