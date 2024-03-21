<?php

namespace App\Validation\Content;

class Images
{

   public function submitOrigName(): array
   {
      return [
         'origname' => [
            'label' => 'Nama file',
            'rules' => 'required'
         ]
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'label' => 'ID images',
            'rules' => 'required|numeric|is_not_unique[tb_mst_images.id,id]'
         ]
      ];
   }
}
