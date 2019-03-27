<?php

namespace App\Http\Requests\Investigation;

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
            'title' => 'required',
            'tags' => 'required',
            'thumbnail' => 'required|image|max:1999'
        ];
    }
}
