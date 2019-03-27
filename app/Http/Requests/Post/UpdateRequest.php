<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Post;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //return $this->user()->can('update', Post::class);
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'id' => 'required',
            'author' => 'required',
            'title' => 'required',
            'content' => 'required',
            'tags' => 'required'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'id.required' => 'Id is required',
            'author.required' => 'Author is required.',
            'title.required' => 'Title is required',
            'story.required' => 'Story is required',
            'tags.required' => 'Tags is required',
            'status_id.required' => 'Status is required'
        ];
    }
}
