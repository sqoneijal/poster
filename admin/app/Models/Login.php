<?php

namespace App\Models;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Login extends Common
{

   public function initPage()
   {
      $session = \Config\Services::session();

      return $this->getUserLogin(intval($session->get('id')));
   }

   private function getUserLogin(int $idUsers): array
   {
      $table = $this->db->table('tb_users');
      $table->select('id, avatar, nama, username, email, role, status, user_modified, uploaded, modified');
      $table->where('id', $idUsers);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }
      return $response;
   }

   public function submit(array $post): array
   {
      $table = $this->db->table('tb_users');
      $table->select('id, avatar, nama, username, email, role, status');
      $table->groupStart();
      $table->where('username', $post['username']);
      $table->orWhere('email', $post['username']);
      $table->groupEnd();

      $get = $table->get();
      $data = $get->getRowArray();
      $get->freeResult();

      $response = ['status' => false];
      if (isset($data)) {
         if ($data['status'] === '1') {
            $session = \Config\Services::session();
            $session->set('id', $data);

            $response['status'] = true;
            $response['msg_response'] = 'Login berhasil halaman segera dialihkan...';
         } else {
            $response['msg_response'] = 'Akun anda sedang tidak aktif!';
         }
      }
      return $response;
   }
}
