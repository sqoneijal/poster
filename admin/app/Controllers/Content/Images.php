<?php

namespace App\Controllers\Content;

use App\Controllers\BaseController;
use App\Models\Content\Images as Model;
use App\Validation\Content\Images as Validate;

class Images extends BaseController
{

   public function index()
   {
      $this->data = [
         'title' => 'Images'
      ];

      $this->template($this->data);
   }

   public function submitOrigName(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submitOrigName())) {
         $model = new Model();
         $submit = $model->submitOrigName($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function submit(): object
   {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'Terjadi sesuatu kesalahan.'];

      $file = $this->request->getFile('file');
      if ($file) {
         $uploadPath = WRITEPATH . 'uploads/images';
         $doUpload = doUpload($file, ['jpg', 'png', 'jpeg'], $uploadPath);

         if ($doUpload['status']) {
            $model = new Model();
            $submit = $model->submit(array_merge(['origname' => $file->getName(), 'filename' => $doUpload['content']], $this->post));

            $response = array_merge($submit, ['errors' => []]);
         } else {
            $response['msg_response'] = $doUpload['content'];
         }
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
      $content = $model->getData($this->post);
      return $this->respond($content);
   }
}
