<?php

namespace App\Models\Content;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Video extends Common
{

   public function updateOrigName(array $post): array
   {
      try {
         $table = $this->db->table('tb_video');
         $table->where('id', $post['id']);
         $table->update([
            'judul' => $post['judul'],
            'user_modified' => $post['user_modified'],
            'modified' => new RawSql('now()')
         ]);
         return ['status' => true, 'content' => $post, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function hapus(array $post): void
   {
      try {
         @unlink(ROOTPATH . 'public/video/' . $post['video_file']);

         $table = $this->db->table('tb_video');
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
         $fields = ['judul', 'video_file'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $path = ROOTPATH . 'public/video/' . $post['video_file'];
         $file = new \CodeIgniter\Files\File($path);

         $data['user_modified'] = $post['user_modified'];
         $data['video_type'] = $file->getMimeType();

         $id = null;

         $table = $this->db->table('tb_video');
         if ($post['pageType'] === 'insert') {
            $data['uploaded'] = new RawSql('now()');

            $table->insert($data);
            $id = $this->db->insertID('tb_video_id_seq');
         } elseif ($post['pageType'] === 'update') {
            $data['modified'] = new RawSql('now()');

            $table->where('id', $post['id']);
            $table->update($data);

            $id = $post['id'];
         }
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
      $table = $this->db->table('tb_video');
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
         'totalData' => $this->prepareTotalData($post),
         'listContent' => $this->prepareListContent($post)
      ];
   }

   private function prepareTotalData(array $post): int
   {
      $table = $this->db->table('tb_video');
      if (isset($post['search'])) {
         $table->like('lower(judul)', $post['search']);
      }
      return $table->countAllResults();
   }

   private function prepareListContent(array $post): array
   {
      $page = intval($post['page']);
      $limit = 9;
      $offset = $page * $limit;

      $table = $this->db->table('tb_video');
      if (isset($post['search'])) {
         $table->like('lower(judul)', $post['search']);
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
