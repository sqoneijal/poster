<?php

namespace App\Validation\Content;

class RunningText
{

   public function submit(): array
   {
      return [
         'text' => [
            'label' => 'Text',
            'rules' => 'required'
         ]
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'label' => 'ID running text',
            'rules' => 'required|numeric|is_not_unique[tb_running_text.id,id]'
         ]
      ];
   }
}
