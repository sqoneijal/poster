<?php

namespace App\Models\Content;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Pengumuman extends Common
{

   public function hapus(array $post): void
   {
      try {
         $table = $this->db->table('tb_pengumuman');
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
         $fields = ['judul', 'content'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               if ($field === 'content') {
                  $data[$field] = htmlentities($post[$field]);
               } else {
                  $data[$field] = $post[$field];
               }
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];

         $table = $this->db->table('tb_pengumuman');
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
      try {
         $table = $this->queryData($post);
         $table->limit((int) $post['length'], (int) $post['start']);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();

         $get->freeResult();

         return $this->processResult($result, $fieldNames);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   private function processResult(array $result, array $fieldNames): array
   {
      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $value = $val[$field] ?? '';
            $trimmed_value = trim($value);
            if ($field === 'content') {
               $decoded_value = html_entity_decode($trimmed_value);
               $response[$key][$field] = $decoded_value;
            } else {
               $response[$key][$field] = $trimmed_value;
            }
         }
      }
      return $response;
   }


   public function countData(array $post): int
   {
      $table = $this->db->table('tb_pengumuman');
      return $table->countAllResults();
   }

   public function filteredData(array $post): int
   {
      $table = $this->queryData($post);
      return $table->countAllResults();
   }

   private function queryData(): object
   {
      $table = $this->db->table('tb_pengumuman');

      $this->prepareDatatableColumnSearch($table, ['judul', 'content']);
      $this->prepareDatatableColumnOrder($table, ['judul', 'content']);

      return $table;
   }
}
