<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Repositories\Manager\VoucherRepository;
use App\Models\Voucher;
use Carbon\Carbon;
use Session;
use Hash;
use DB;

class VoucherController extends Controller
{
    protected $voucher;

    public function __construct(Voucher $voucher){
        $this->voucher             = new VoucherRepository($voucher);
    }

    public function get(){
        $data = $this->voucher->get_voucher();
        return $this->voucher->send_response(201, $data, null);
    }
    public function get_one($id){
        $data = $this->voucher->get_one($id);
        return $this->voucher->send_response(200, $data, null);
    }

    public function store(Request $request){ 
        $data = [
            "name"      => $request->data_name,
            "discount"      => $request->data_discount,
            "time"      => $request->data_time,
        ];
        $data_return = $this->voucher->create($data);
        return $this->voucher->send_response(201, null, null);
    }
    public function delete($id){
        $data = $this->voucher->delete($id);
        return $this->voucher->send_response(200, "Delete successful", null);
    }
}
