<?php

namespace App\Validation;

class Playlist
{

   public function handleSetScreen(): array
   {
      return [
         'id_playlist' => [
            'label' => 'ID playlist',
            'rules' => 'required|numeric|is_not_unique[tb_playlist.id,id_playlist]'
         ],
         'id_screen' => [
            'label' => 'ID screen',
            'rules' => 'required|numeric|is_not_unique[tb_screen.id,id_screen]'
         ]
      ];
   }

   public function submit(): array
   {
      return [
         'nama' => [
            'label' => 'Nama playlist',
            'rules' => 'required'
         ]
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'label' => 'ID playlist',
            'rules' => 'required|numeric|is_not_unique[tb_playlist.id,id]'
         ]
      ];
   }
}
