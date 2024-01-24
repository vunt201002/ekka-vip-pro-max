<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        DB::table('admin')->insert([
            'secret_key'    => '3745821',
            'email'         => 'admin@gmail.com',
            'password'      => '$2y$10$pmNHwQhyhP.dmPUxVMXzQOtB9IUo3q5NYqJSpaAvGEMI8aK5eyVx6',
        ]);

        DB::table('size')->insert([ 'name' => 'XS', ]);
        DB::table('size')->insert([ 'name' => 'S', ]);
        DB::table('size')->insert([ 'name' => 'M', ]);
        DB::table('size')->insert([ 'name' => 'L', ]);
        DB::table('size')->insert([ 'name' => 'XL', ]);
        DB::table('size')->insert([ 'name' => 'XXL', ]);


        DB::table('color')->insert([ 'name' => 'Đen', 'hex' => '#000000', ]);
        DB::table('color')->insert([ 'name' => 'Đỏ', 'hex' => '#ff0000', ]);

        DB::table('category')->insert([ 'name' => 'Áo thun', 'slug' => 'ao-thun', ]);
        DB::table('trademark')->insert([ 'name' => 'Boo', 'slug' => 'boo', ]);
    }
}
