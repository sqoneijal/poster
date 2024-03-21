<?php

namespace App\Controllers;

use App\Models\Login as Model;
use App\Validation\Login as Validate;

class Login extends BaseController
{

   public function index(): string
   {
      $this->data = [
         'title' => 'Login',
         'cssTag' => $this->cssTag(true),
         'scriptTag' => $this->scriptTag(true)
      ];

      return view('Login', $this->data);
   }

   public function logout(): object
   {
      $session = \Config\Services::session();
      $session->destroy();
      return redirect()->to('/');
   }

   private function cssTag(bool $publish): string
   {
      $css_tag = '';
      if (!$publish) {
         $css_tag = link_tag('http://localhost:8081/App.css');
      } else {
         $css_tag = link_tag('bundle/App.css');
      }
      return $css_tag;
   }

   public function initPage(): object
   {
      $model = new Model();
      $content = $model->initPage();
      return $this->respond($content);
   }

   public function scriptTag(bool $publish): string
   {
      $script_tag = '';
      if (!$publish) {
         $script_tag = script_tag('http://localhost:8081/App.js');
      } else {
         $script_tag = script_tag(['src' => 'bundle/App.js', 'type' => 'module']);
      }
      return $script_tag;
   }

   public function submit(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $model = new Model();
         $submit = $model->submit($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }
}
