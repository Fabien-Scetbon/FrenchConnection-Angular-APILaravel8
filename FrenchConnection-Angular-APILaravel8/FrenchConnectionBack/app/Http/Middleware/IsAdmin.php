<?php

namespace App\Http\Middleware;

use JWTAuth;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (JWTAuth::user()->role_id !== 4) {
            return response()->json(['success' => false, 'message' => 'Unauthorised.', 'data' => ['error' => 'Unauthorised']], 401);
        }

        return $next($request);
    }
}
