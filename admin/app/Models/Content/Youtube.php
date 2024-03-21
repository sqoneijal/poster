<?php

namespace App\Models\Content;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Youtube extends Common
{

   public function hapus(array $post): void
   {
      try {
         $table = $this->db->table('tb_youtube');
         $table->where('id', $post['id']);
         $table->delete();
      } catch (\Exception $e) {
         die(json_encode(['status' => false, 'msg_response' => $e->getMessage(), 'errors' => []]));
      }
   }

   public function submit(array $post): array
   {
      $response = ['status' => false, 'msg_response' => 'Terjadi sesuatu kesalahan.', 'errors' => []];
      try {
         $fields = ['nama', 'link'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];

         $table = $this->db->table('tb_youtube');
         if ($post['pageType'] === 'insert') {
            $data['uploaded'] = new RawSql('now()');

            $table->insert($data);
         } elseif ($post['pageType'] === 'update') {
            $data['modified'] = new RawSql('now()');

            $table->where('id', $post['id']);
            $table->update($data);
         }
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } catch (\Exception $e) {
         $response['msg_response'] = $e->getMessage();
      }
      return $response;
   }

   public function getData(array $post): array
   {
      return [
         'totalData' => $this->prepareTotalData($post),
         'listContent' => $this->prepareListContent($post)
      ];
   }

   private function prepareTotalData(array $post): int
   {
      $table = $this->db->table('tb_youtube');
      if (isset($post['search'])) {
         $table->like('lower(nama)', $post['search']);
      }
      return $table->countAllResults();
   }

   private function prepareListContent(array $post): array
   {
      $page = intval($post['page']);
      $limit = 9;
      $offset = $page * $limit;

      $table = $this->db->table('tb_youtube');
      if (isset($post['search'])) {
         $table->like('lower(nama)', $post['search']);
      }
      $table->orderBy('id', 'desc');
      $table->limit($limit, $offset);

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }
      }
      return $response;
   }
}
