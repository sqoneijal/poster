<?php

namespace App\Validation\Content;

class Pengumuman
{

   public function submit(): array
   {
      return [
         'judul' => [
            'label' => 'Judul',
            'rules' => 'required'
         ],
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'label' => 'ID pengumuman',
            'rules' => 'required|numeric|is_not_unique[tb_pengumuman.id,id]'
         ]
      ];
   }
}
