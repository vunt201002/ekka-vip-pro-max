<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Repositories\Manager\ProductRepository;
use App\Models\Product;
use Carbon\Carbon;
use Session;
use Hash;
use DB;

class ProductController extends Controller
{
    protected $product;

    public function __construct(Product $product){
        $this->product             = new ProductRepository($product);
    }
    public function index(){
        return view("admin.manager.product");
    }
    public function discount(){
        return view("admin.manager.discount");
    }
    public function voucher(){
        return view("admin.manager.voucher");
    }
    public function get(){
        $data = $this->product->get_product();
        return $this->product->send_response(201, $data, null);
    }
    public function getfree(){
        $data = $this->product->getfree();
        return $this->product->send_response(201, $data, null);
    }

    public function get_discount(){
        $data = $this->product->get_discount();
        return $this->product->send_response(201, $data, null);
    }
    
    public function get_one($id){
        $data = $this->product->get_one($id);
        return $this->product->send_response(200, $data, null);
    }
    public function getSize(Request $request){
        $id = $request->id;

        $item = DB::table('product_detail')
            ->select("product_detail.*", "color.name as color_name", "size.name as size_name")
            ->leftjoin("color", "color.id", "=", "color_id")
            ->leftjoin("size", "size.id", "=", "size_id")
            ->where("product_detail.product_id", "=", $id)
            ->get(); 

        return $this->product->send_response(200, $item, null); 
    }
    public function deleteColor($id){
        DB::table('product_detail')->where('id', '=', $id)->delete();

        return $this->product->send_response(200, null, null); 
    }
    public function getProductSize(){ 

        $item = DB::table('product_detail')
            ->select("product_detail.*", "color.name as color_name", "size.name as size_name")
            ->leftjoin("color", "color.id", "=", "color_id")
            ->leftjoin("size", "size.id", "=", "size_id") 
            ->get(); 

        return $this->product->send_response(200, $item, null); 
    }


    public function createDetail(Request $request){

        $id = $request->data_id;
        $size = $request->data_size;
        $color = $request->data_color;

        $item = DB::table('product_detail')->where([["product_id", "=", $id], ["size_id", "=", $size], ["color_id", "=", $color]])->first(); 

        if ($item) {
            return $this->product->send_response(500, null, null);
        }else{
            $data = [
                "product_id" => $id,
                "size_id" => $size,
                "color_id" => $color,
            ];
            DB::table('product_detail')->insert($data);

            return $this->product->send_response(200, null, null);
        }

    }

    public function store(Request $request){ 
        $data = [
            "category_id"   => $request->data_category,
            "trademark_id"   => $request->data_trademark,
            "name"          => $request->data_name,
            "slug"          => $this->product->to_slug($request->data_name),
            // "metadata"      => $request->data_metadata,
            "description"   => nl2br($request->data_description ?? ""),
            "detail"        => $request->data_detail ?? "",
            "prices"        => $request->data_prices,
        ];
        if ($request->data_banner != "undefined") {
            $data["banner"] = $this->product->imageInventor('image-upload', $request->data_banner, 1920);
        }
        $image_list     = array();
        if ($request->image_list_length) {
            for ($i=0; $i < $request->image_list_length; $i++) { 
                array_push($image_list, $this->product->imageInventor('image-upload', $request['image_list_item_'.$i], 1920));
            }
            $data['images'] = implode(",",$image_list);
        }
        $data_return = $this->product->create($data);
        return $this->product->send_response(201, $data_return, null);
    }
    public function update(Request $request){
        $data = [
            "category_id"   => $request->data_category,
            "trademark_id"   => $request->data_trademark,
            "name"          => $request->data_name,
            "slug"          => $this->product->to_slug($request->data_name),
            // "metadata"      => $request->data_metadata,
            "description"   => nl2br($request->data_description ?? ""),
            "detail"        => $request->data_detail ?? "",
            "prices"        => $request->data_prices,
        ];
        $image_list_prev     = $request->data_images_preview;

        $image_list     = array();
        if ($request->image_list_length) {
            for ($i=0; $i < $request->image_list_length; $i++) { 
                array_push($image_list, $this->product->imageInventor('image-upload', $request['image_list_item_'.$i], 1920));
            }
            $data['images'] = $image_list_prev.",".implode(",",$image_list);
        }
        $data['images'] = $image_list_prev;
        if ($request->data_banner != "undefined") {
            $data["banner"] = $this->product->imageInventor('image-upload', $request->data_banner, 1920);
        }
        $data_return = $this->product->update($data, $request->data_id);
        return $this->product->send_response(201, $data_return, null);
    }
    public function update_discount(Request $request){
        $product_id = $request->data_product;
        $discount = $request->data_discount;
        $time = $request->data_time;
        $this->product->update(["discount" => $discount, "discount_time" => $time, ], $product_id);
        return $this->product->send_response(200, null, null);
    }
    public function delete_discount($id){
        $this->product->update(["discount" => 0], $id);
        return $this->product->send_response(200, null, null);
    }

    public function delete($id){
        $data = $this->product->delete($id);
        return $this->product->send_response(200, "Delete successful", null);
    }
    public function imageUpload(Request $request){
        $data = $this->product->imageInventor('image-upload', $request->file, 1920);
        return $this->product->send_response(201, $data, null);
    }
    // cập nhật trending
    public function update_trending(Request $request){
        $this->product->update_trending($request->id);
        return $this->product->send_response(200, null, null);
    }
}
