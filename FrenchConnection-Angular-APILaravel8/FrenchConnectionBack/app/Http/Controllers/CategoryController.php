<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Controllers\BaseController;

class CategoryController extends BaseController
{
    public function getCategories()
    {
        $categories = Category::all();
        $message = 'Request Get Category index successfull.';

        return $this->sendResponse([
            'categories' => $categories,

        ], $message, 201);
    }

    public function getCategory($id)
    {
        try {
            $category = Category::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Category not found', $e, 400);
        }

        $message = 'Category successfully found';
        return $this->sendResponse([
            'category' => $category,
        ], $message, 201);
    }

    public function createCategory(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required',
        ]);

        if ($validator->fails()) {

            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }

        $category = Category::create($data);

        $message = "Category created !";

        return $this->sendResponse($category, $message, 201);
    }

    public function updateCategory(Request $request, $id)
    {
        $category = Category::find($id);
        $data = $request->all();

        $validator = Validator::make($data, [

            'name' => 'sometimes',

            
        ]);

        if ($validator->fails()) {

            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }
        if (isset($data['name'])) {
            $category->name = $data['name']; }

       
        $result = $category->save();    

        if ($result) {
            $message = 'The Category has been succesfully updated';
        } else {
            $message = 'We have encounter an error in the updating of the Category';
        }

        return $this->sendResponse($category, $message, 201);
    }

    public function deleteCategory($id)
    {
        $category = Category::find($id);
        $result = $category->delete();
        if ($result) {
            $message = 'The Category has been succesfully delete';
        } else {
            $message = 'We have encounter an error in the deleting of the Category';
        }
        return $this->sendResponse($category, $message, 201);
    }
}