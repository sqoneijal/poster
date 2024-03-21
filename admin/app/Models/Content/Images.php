<?php

namespace App\Models\Content;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Images extends Common
{

   public function submitOrigName(array $post): array
   {
      try {
         $table = $this->db->table('tb_mst_images');
         $table->where('id', $post['id']);
         $table->update([
            'origname' => $post['origname'],
            'user_modified' => $post['user_modified'],
            'modified' => new RawSql('now()')
         ]);
         return ['status' => true, 'content' => '', 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function hapus(array $post): void
   {
      try {
         @unlink(WRITEPATH . 'uploads/images/' . $post['filename']);

         $table = $this->db->table('tb_mst_images');
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
         $fields = ['filename', 'origname'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];
         $data['uploaded'] = new RawSql('now()');

         $table = $this->db->table('tb_mst_images');
         $table->insert($data);

         $id = $this->db->insertID('tb_mst_images_id_seq');

         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
         $response['content'] = $this->getLastInsert($id);
      } catch (\Exception $e) {
         $response['msg_response'] = $e->getMessage();
      }
      return $response;
   }

   private function getLastInsert(int $id): array
   {
      $table = $this->db->table('tb_mst_images');
      $table->where('id', $id);

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

   public function getData(array $post): array
   {
      return [
         'totalListContent' => $this->prepareTotalListContent($post),
         'listContent' => $this->prepareListContent($post)
      ];
   }

   private function prepareTotalListContent(array $post): int
   {
      $table = $this->db->table('tb_mst_images');
      if (isset($post['search'])) {
         $table->groupStart();
         $table->like('lower(origname)', $post['search']);
         $table->orLike('lower(filename)', $post['search']);
         $table->groupEnd();
      }
      return $table->countAllResults();
   }

   private function prepareListContent(array $post): array
   {
      $page = intval($post['page']);
      $limit = 9;
      $offset = $page * $limit;

      $table = $this->db->table('tb_mst_images');
      if (isset($post['search'])) {
         $table->groupStart();
         $table->like('lower(origname)', $post['search']);
         $table->orLike('lower(filename)', $post['search']);
         $table->groupEnd();
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
