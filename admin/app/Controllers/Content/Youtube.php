<?php

namespace App\Controllers\Content;

use App\Controllers\BaseController;
use App\Models\Content\Youtube as Model;
use App\Validation\Content\Youtube as Validate;

class Youtube extends BaseController
{

   public function index()
   {
      $this->data = [
         'title' => 'Youtube'
      ];

      $this->template($this->data);
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

   public function hapus(): object
   {
      $response = ['status' => false, 'msg_response' => 'Terjadi sesuatu kesalahan.'];

      $validation = new Validate();
      if ($this->validate($validation->hapus())) {
         $model = new Model();
         $model->hapus($this->post);

         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil dihapus.';
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->respond($response);
   }

   public function getData(): object
   {
      $model = new Model();
      $data = $model->getData($this->post);
      return $this->respond($data);
   }
}
