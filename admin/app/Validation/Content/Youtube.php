<?php

namespace App\Validation\Content;

class Youtube
{

   public function submit(): array
   {
      return [
         'nama' => [
            'label' => 'Nama',
            'rules' => 'required'
         ],
         'link' => [
            'label' => 'Link youtube',
            'rules' => 'required|valid_url_strict'
         ]
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'label' => 'ID youtube',
            'rules' => 'required|numeric|is_not_unique[tb_youtube.id,id]'
         ]
      ];
   }
}
