<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */

    public function sendResponse($result, $message, $status = 'somevalue')

    {

    	$response = [

            'success' => true,

            'data'    => $result,

            'message' => $message,

            'status' => $status,

        ];


        return response()->json($response);

    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */

    public function sendError($error, $errorMessages = [], $status = 404)

    {

    	$response = [

            'success' => false,

            'message' => $error,

        ];


        if(!empty($errorMessages)){

            $response['data'] = $errorMessages;

        }


        return response()->json($response, $status);

    }
}
