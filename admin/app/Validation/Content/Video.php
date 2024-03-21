<?php

namespace App\Validation\Content;

class Video
{

   public function updateOrigName(): array
   {
      return [
         'judul' => [
            'label' => 'Judul',
            'rules' => 'required'
         ]
      ];
   }

   public function submit(): array
   {
      return [
         'judul' => [
            'label' => 'Judul',
            'rules' => 'required'
         ],
         'video_file' => [
            'label' => 'File video',
            'rules' => 'required'
         ]
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'label' => 'ID video',
            'rules' => 'required|numeric|is_not_unique[tb_video.id,id]'
         ]
      ];
   }
}
