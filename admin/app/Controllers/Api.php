<?php

namespace App\Controllers;

use App\Models\Api as Model;

class Api extends BaseController
{

   public function images()
   {
      $model = new Model();
      $data = $model->getImages();
      return $this->respond($data);
   }

   public function playlist(string $slug): object
   {
      $model = new Model();
      $data = $model->getPlaylist($slug);
      return $this->respond($data);
   }
}
