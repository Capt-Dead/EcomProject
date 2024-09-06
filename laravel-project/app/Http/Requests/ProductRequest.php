<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class  ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'            => "required",
            'image'           => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
            'descs'           => "required",
            'gender'          => "required",
            'stock_inventory' => "required|numeric",
            'price'           => "required|numeric",
        ];
    }
}
