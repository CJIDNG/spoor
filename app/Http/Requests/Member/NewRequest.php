<?php

namespace App\Http\Requests\Member;

use Illuminate\Foundation\Http\FormRequest;

class NewRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'full_name' => 'required',
            'country' => 'required',
            'designation' => 'required',
            'bio' => 'required',
            'thumbnail' => 'required|image|max:1999'
        ];
    }
}
