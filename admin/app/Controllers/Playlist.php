<?php

namespace App\Controllers;

use App\Models\Playlist as Model;
use App\Validation\Playlist as Validate;

class Playlist extends BaseController
{

   public function index()
   {
      $this->data = [
         'title' => 'Playlist'
      ];

      $this->template($this->data);
   }

   public function submitContent(): object
   {
      $model = new Model();
      $data = $model->submitContent($this->post);
      return $this->respond($data);
   }

   public function getDaftarPengumuman(): object
   {
      $model = new Model();
      $data = $model->getDaftarPengumuman($this->getVar);
      return $this->respond($data);
   }

   public function getDaftarRunningText(): object
   {
      $model = new Model();
      $data = $model->getDaftarRunningText($this->getVar);
      return $this->respond($data);
   }

   public function getDaftarYoutube(): object
   {
      $model = new Model();
      $data = $model->getDaftarYoutube($this->getVar);
      return $this->respond($data);
   }

   public function getDaftarVideo(): object
   {
      $model = new Model();
      $data = $model->getDaftarVideo($this->getVar);
      return $this->respond($data);
   }

   public function getDaftarImages(): object
   {
      $model = new Model();
      $data = $model->getDaftarImages($this->getVar);
      return $this->respond($data);
   }

   public function handleSetScreen(): object
   {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'Terjadi sesuatu kesalahan.'];

      $validation = new Validate();
      if ($this->validate($validation->handleSetScreen())) {
         $model = new Model();
         $submit = $model->handleSetScreen($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->respond($response);
   }

   public function initPage(): object
   {
      $model = new Model();
      $data = [
         'daftarScreen' => $model->getDaftarScreen()
      ];
      return $this->respond($data);
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
      $query = $model->getData($this->getVar);

      $output = [
         'draw' => intval(@$this->post['draw']),
         'recordsTotal' => intval($model->countData($this->getVar)),
         'recordsFiltered' => intval($model->filteredData($this->getVar)),
         'data' => $query
      ];
      return $this->respond($output);
   }
}
