<?php

namespace App\Models;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Playlist extends Common
{

   public function submitContent(array $post): array
   {
      try {
         $video = json_decode($post['video'], true);
         $youtube = json_decode($post['youtube'], true);
         $images = json_decode($post['images'], true);
         $running_text = json_decode($post['running_text'], true);
         $pengumuman = json_decode($post['pengumuman'], true);

         $table = $this->db->table('tb_playlist');
         $table->where('id', $post['id']);
         $table->update([
            'user_modified' => $post['user_modified'],
            'modified' => new RawSql('now()'),
            'video' => json_encode($video),
            'youtube' => json_encode($youtube),
            'images' => json_encode($images),
            'running_text' => json_encode($running_text),
            'pengumuman' => json_encode($pengumuman),
         ]);

         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function getDaftarPengumuman(array $post): array
   {
      return [
         'totalData' => $this->prepareTotalDataPengumuman($post),
         'listContent' => $this->prepareListContentPengumuman($post)
      ];
   }

   private function prepareTotalDataPengumuman(array $post): int
   {
      $table = $this->db->table('tb_pengumuman');
      if (isset($post['search'])) {
         $table->like('lower(judul)', $post['search']);
      }
      return $table->countAllResults();
   }

   private function prepareListContentPengumuman(array $post): array
   {
      $page = intval($post['page']);
      $limit = 15;
      $offset = $page * $limit;

      $table = $this->db->table('tb_pengumuman');
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

   public function getDaftarRunningText(array $post): array
   {
      return [
         'totalData' => $this->prepareTotalDataRunningText($post),
         'listContent' => $this->prepareListContentRunningText($post)
      ];
   }

   private function prepareTotalDataRunningText(array $post): int
   {
      $table = $this->db->table('tb_running_text');
      if (isset($post['search'])) {
         $table->like('lower(text)', $post['search']);
      }
      return $table->countAllResults();
   }

   private function prepareListContentRunningText(array $post): array
   {
      $page = intval($post['page']);
      $limit = 15;
      $offset = $page * $limit;

      $table = $this->db->table('tb_running_text');
      if (isset($post['search'])) {
         $table->like('lower(text)', $post['search']);
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

   public function getDaftarYoutube(array $post): array
   {
      return [
         'totalData' => $this->prepareTotalDataYoutube($post),
         'listContent' => $this->prepareListContentYoutube($post)
      ];
   }

   private function prepareTotalDataYoutube(array $post): int
   {
      $table = $this->db->table('tb_youtube');
      if (isset($post['search'])) {
         $table->like('lower(nama)', $post['search']);
      }
      return $table->countAllResults();
   }

   private function prepareListContentYoutube(array $post): array
   {
      $page = intval($post['page']);
      $limit = 15;
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

   public function getDaftarVideo(array $post): array
   {
      return [
         'totalData' => $this->prepareTotalDataVideo($post),
         'listContent' => $this->prepareListContentVideo($post)
      ];
   }

   private function prepareTotalDataVideo(array $post): int
   {
      $table = $this->db->table('tb_video');
      if (isset($post['search'])) {
         $table->like('lower(judul)', $post['search']);
      }
      return $table->countAllResults();
   }

   private function prepareListContentVideo(array $post): array
   {
      $page = intval($post['page']);
      $limit = 15;
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

   public function getDaftarImages(array $post): array
   {
      return [
         'totalData' => $this->prepareTotalDataImages($post),
         'listContent' => $this->prepareListContentImages($post)
      ];
   }

   private function prepareTotalDataImages(array $post): int
   {
      $table = $this->db->table('tb_mst_images');
      if (isset($post['search'])) {
         $table->like('lower(origname)', $post['search']);
      }
      return $table->countAllResults();
   }

   private function prepareListContentImages(array $post): array
   {
      $page = intval($post['page']);
      $limit = 15;
      $offset = $page * $limit;

      $table = $this->db->table('tb_mst_images');
      if (isset($post['search'])) {
         $table->like('lower(origname)', $post['search']);
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

   public function handleSetScreen(array $post): array
   {
      $response = ['status' => false, 'msg_response' => 'Terjadi sesuatu kesalahan.', 'errors' => []];
      try {
         $fields = ['id_playlist', 'id_screen'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];

         $table = $this->db->table('tb_playlist_detail');
         if ($post['pageType'] === 'insert') {
            $data['uploaded'] = new RawSql('now()');

            $table->ignore(true)->insert($data);
         } elseif ($post['pageType'] === 'delete') {
            $table->where('id_playlist', $post['id_playlist']);
            $table->where('id_screen', $post['id_screen']);
            $table->delete($data);
         }

         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } catch (\Exception $e) {
         $response['msg_response'] = $e->getMessage();
      }
      return $response;
   }

   public function hapus(array $post): void
   {
      try {
         $table = $this->db->table('tb_playlist');
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
         $fields = ['nama'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];

         $table = $this->db->table('tb_playlist');
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

         $idPlaylist = [];
         foreach ($result as $row) {
            $idPlaylist[] = $row['id'];
         }

         $checkScreenActive = $this->checkScreenActive($idPlaylist);

         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               if ($field === 'images' || $field === 'youtube' || $field === 'video' || $field === 'pengumuman' || $field === 'running_text') {
                  $response[$key][$field] = json_decode($val[$field], true);
               } else {
                  $response[$key][$field] = ($val[$field] ? trim($val[$field]) : '');
               }
            }

            $response[$key]['screen_active'] = $checkScreenActive[$val['id']] ?? [];
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   private function checkScreenActive(array $idPlaylist): array
   {
      $response = [];

      if (arrLength($idPlaylist)) {
         $table = $this->db->table('tb_playlist_detail tpd');
         $table->select('tpd.id_playlist, tpd.id_screen, ts.nama, ts.kode');
         $table->join('tb_screen ts', 'ts.id = tpd.id_screen');
         $table->whereIn('tpd.id_playlist', $idPlaylist);

         $get = $table->get();
         $result = $get->getResultArray();
         $get->freeResult();

         foreach ($result as $row) {
            $response[$row['id_playlist']][] = [
               'id_screen' => intval($row['id_screen']),
               'nama' => ($row['nama']),
               'kode' => $row['kode']
            ];
         }
      }
      return $response;
   }

   public function countData(array $post): int
   {
      $table = $this->db->table('tb_playlist');
      return $table->countAllResults();
   }

   public function filteredData(array $post): int
   {
      $table = $this->queryData($post);
      return $table->countAllResults();
   }

   private function queryData(): object
   {
      $table = $this->db->table('tb_playlist');

      $this->prepareDatatableColumnSearch($table, ['nama']);
      $this->prepareDatatableColumnOrder($table, ['nama']);

      return $table;
   }
}
