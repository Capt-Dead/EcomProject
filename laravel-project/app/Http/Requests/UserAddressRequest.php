<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'address_line1' => 'required',
            'address_line2' => 'required',
            'city'          => 'required',
            'postal_coode'  => 'required',
            'country'       => 'required',
            'mobile_no'     => 'required',
        ];
    }
}
