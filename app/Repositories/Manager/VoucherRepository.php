<?php

namespace App\Repositories\Manager;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;
use App\Repositories\RepositoryInterface;
use Session;
use Hash;
use DB;

class VoucherRepository extends BaseRepository implements RepositoryInterface
{
    protected $model;

    public function __construct(Model $model){
        $this->model = $model;
    }
 
    public function get_voucher(){
        $sql = "SELECT * FROM voucher ";
        return DB::select($sql);
    }
    public function get_one($id){
        $sql = "SELECT * FROM voucher WHERE name like '".$id."'";
        return DB::select($sql);
    }
    
}
