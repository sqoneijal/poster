<?php

namespace App\Validation;

class Screen
{

   private function validasiKode(
      \CodeIgniter\Database\BaseConnection &$db
   ): callable {
      return static function ($value, array $data, ?string &$error) use ($db): bool {
         $screenTable = $db->table('tb_screen');
         $screenTable->where('LOWER(kode)', mb_strtolower(trim($value)));

         if (
            ($data['pageType'] === 'insert' && $screenTable->countAllResults() > 0)
            || (isset($data['old_kode'])
               && trim($value) !== $data['old_kode']
               && $screenTable->countAllResults() > 0)
         ) {
            $error = 'Kode layar sudah terdaftar. Silahkan gunakan yang lain.';
            return false;
         }

         return true;
      };
   }

   public function submit(): array
   {
      $db = \Config\Database::connect();
      $validasiKode = $this->validasiKode($db);

      return [
         'kode' => [
            'label' => 'Kode layar',
            'rules' => ['required', $validasiKode]
         ],
         'nama' => [
            'label' => 'Nama layar',
            'rules' => 'required'
         ]
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'label' => 'ID layar',
            'rules' => 'required|numeric|is_not_unique[tb_screen.id,id]'
         ]
      ];
   }
}
