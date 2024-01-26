<?php

namespace App\Repositories\Manager;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;
use App\Repositories\RepositoryInterface;
use Session;
use Hash;
use DB;

class ProductRepository extends BaseRepository implements RepositoryInterface
{
    protected $model;

    public function __construct(Model $model){
        $this->model = $model;
    }

    public function getfree(){
        $sql = "SELECT product.*
                    FROM product
                    WHERE discount = 0";
        return DB::select($sql);
    }
    public function get_product(){
        $sql = "SELECT product.*, category.name as category_name, trademark.name as trademark_name, warehouse.quantity
                    FROM product
                    LEFT JOIN category
                    ON category.id = product.category_id
                    LEFT JOIN warehouse
                    ON product.id = warehouse.product_id
                    LEFT JOIN trademark
                    ON product.trademark_id = trademark.id
                    ORDER BY product.created_at DESC";
        return DB::select($sql);
    }
    public function get_discount(){
        $sql = "SELECT product.*, category.name as category_name
                    FROM product
                    LEFT JOIN category
                    ON category.id = product.category_id
                    WHERE product.discount <> 0
                    ORDER BY product.created_at DESC";
        return DB::select($sql);
    }

    public function get_one($id){
        $sql = "SELECT product.*,
                    category.name as category_name
                FROM product 
                LEFT JOIN category
                ON category.id = product.category_id
                WHERE product.id = ".$id;
        return DB::select($sql);
    }
    public function update_trending($id){
        $sql = 'UPDATE product set trending = !trending WHERE id = '.$id;
        DB::select($sql);
    }
    
    public function get_size($id){
        $sql = "SELECT product_detail.*, size.name as size_name, color.name as color_name, color.hex as color_hex
                    FROM product_detail
                    LEFT JOIN size
                    ON size.id = product_detail.size_id
                    LEFT JOIN color
                    ON color.id = product_detail.color_id
                    WHERE product_detail.product_id = ".$id;
        return DB::select($sql);
    }


    // Customer
    public function get_all_condition($request){
        $category_id    = $request->tag;
        $keyword        = $request->keyword;
        list($prices_from, $prices_to) = explode(',', $request->prices, 2);
        $sort           = $request->sort;
        $status         = $request->status;
        $where_sql      = "";

        if ($category_id > 0) $where_sql = " AND category_id = ".$category_id;
        if ($keyword != "") $where_sql = " AND name like '%".$keyword."%'";
        if ($status == "new") {
            $where_sql = " ORDER BY created_at DESC";
        }else if ($status == "1") {
            $where_sql = " AND discount <> 0";
        }
        $sort_by = "";


        $sql = "SELECT * FROM product WHERE prices BETWEEN ".$prices_from." AND ".$prices_to.$where_sql;
        return DB::select($sql);
    }
    public function get_condition($request, $count){
        $category_id    = $request->tag;
        $keyword        = $request->keyword;
        $page           = $request->page;
        $pageSize       = $request->pageSize;
        list($prices_from, $prices_to) = explode(',', $request->prices, 2);
        $sort           = $request->sort;
        $status         = $request->status;
        $where_sql      = "";

        if ($category_id > 0) $where_sql = " AND category_id = ".$category_id;
        if ($keyword != "") $where_sql = " AND name like '%".$keyword."%'";
        if ($status == "new") {
            $where_sql = " ORDER BY created_at DESC";
        }else if ($status == "1") {
            $where_sql = " AND discount <> 0";
        }
        $sort_by = "";
        if ($sort == 1) {
            $sort_by = " ORDER BY created_at DESC";
        }else if($sort == 2){
            $sort_by = " ORDER BY name ASC";
        }else if($sort == 3){
            $sort_by = " ORDER BY name DESC";
        }else if($sort == 4){
            $sort_by = " ORDER BY prices ASC";
        }else if($sort == 5){
            $sort_by = " ORDER BY prices DESC";
        }
        $offset = $page == 1 ? "" : " OFFSET ".(($page-1) * $pageSize);

        $sql = "SELECT  *
                FROM product 
                WHERE prices BETWEEN ".$prices_from." AND ".$prices_to.$where_sql.$sort_by."
                LIMIT ".$pageSize.$offset;
        
        return DB::select($sql);
    }
 
    // Index
    public function get_trending(){
        $sql = "SELECT  *
                FROM product 
                WHERE trending = 1";
        return DB::select($sql);
    }
    public function get_new_arrivals(){
        $sql = "SELECT *
                    FROM product 
                    ORDER BY product.created_at DESC
                    LIMIT 4";
        return DB::select($sql);
    } 
    public function get_with_category($id){
        $sql = "SELECT *
                FROM product 
                WHERE category_id = ".$id." LIMIT 8";
        return DB::select($sql);
    }
    public function get_best_sale(){
        $sql = "SELECT *
                FROM product 
                ORDER BY discount DESC LIMIT 1";
        return DB::select($sql);
    }
    public function get_related($category_id, $id){
        $sql = "SELECT  *
                FROM product 
                WHERE category_id = ".$category_id." AND id <> ".$id."
                LIMIT 4";
        return DB::select($sql);
    }
    public function host_product(){
        $sql = "SELECT order_detail.product_id, 
                        sum(order_detail.quantity) as total, 
                        warehouse.quantity,
                        product.id,
                        product.name,
                        product.discount,
                        product.prices,
                        product.images
                    FROM order_time
                    LEFT JOIN order_detail
                    ON order_time.id = order_detail.order_id
                    LEFT JOIN warehouse
                    ON warehouse.product_id = order_detail.product_id
                    LEFT JOIN product_detail
                    ON product_detail.id = warehouse.product_id
                    LEFT JOIN product
                    ON product.id = product_detail.product_id
                    LEFT JOIN size
                    ON size.id = product_detail.size_id
                    LEFT JOIN color
                    ON color.id = product_detail.color_id
                    WHERE order_status = 4
                    GROUP BY order_detail.product_id, 
                            warehouse.quantity,
                            product.id,
                            product.name,
                        product.discount,
                        product.prices,
                            product.images
                    ORDER BY total DESC LIMIT 5";
        return DB::select($sql);
    }


    public function find_real_time($slug){ 
        $sql = "SELECT  *
                FROM product 
                WHERE slug like '%".$slug."%'
                LIMIT 5";
        return DB::select($sql);
    }

}
