<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Post;

class NewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //return $this->user()->can('create', Post::class);
        //dd($this->user()->can('create', Post::class));
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'author' => 'required',
            'title' => 'required',
            'content' => 'required',
            'tags' => 'required',
            'thumbnail' => 'required|image|max:1999'
        ];
    }
}
