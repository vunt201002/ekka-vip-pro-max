<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Repositories\Manager\ShipperRepository;
use App\Models\AdminDetail;
use Carbon\Carbon;
use Session;
use Hash;
use DB;

class ShipperController extends Controller
{
    protected $admin;

    public function __construct(AdminDetail $admin){
        $this->admin        = new ShipperRepository($admin);
    }

    public function index(){
        return view("admin.manager.shipper");
    }
    public function get(){
        $data = $this->admin->get_shipper();
        return $this->admin->send_response(201, $data, null);
    }
    public function get_one($id){
        $data = $this->admin->get_one($id);
        return $this->admin->send_response(200, $data, null);
    }
    public function store(Request $request){
        $data = [
            "admin_id"      => 1,
            "name"      => $request->data_name,
            "address"      => $request->data_address,
            "telephone"      => $request->data_phone,
        ];
        $data_return = $this->admin->create($data);
        return $this->admin->send_response(201, null, null);
    }
    public function update(Request $request){
        $id                 = $request->data_id;
        $data_update   = [
            "admin_id"      => 1,
            "name"      => $request->data_name,
            "address"      => $request->data_address,
            "telephone"      => $request->data_phone,
        ];
        $this->admin->update($data_update, $id);
        return $this->admin->send_response(200, null, null);
    }

    public function delete($id){
        $data = $this->admin->delete($id);
        return $this->admin->send_response(200, "Delete successful", null);
    }


}
