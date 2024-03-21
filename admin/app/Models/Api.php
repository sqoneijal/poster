<?php

namespace App\Models;

use App\Models\Common;

class Api extends Common
{

   public function getPlaylist(string $slug): array
   {
      $table = $this->db->table('tb_screen ts');
      $table->select('tp.images, tp.video, tp.youtube, tp.running_text, tp.pengumuman, ts.screen_rotation, ts.screen_animation');
      $table->join('tb_playlist_detail tpd', 'tpd.id_screen = ts.id');
      $table->join('tb_playlist tp', 'tp.id = tpd.id_playlist');
      $table->where('ts.kode', $slug);

      $get = $table->get();
      $data = $get->getRowArray();
      $get->freeResult();

      if (!isset($data)) {
         return [];
      }

      $dataFields = $this->extractDataFields($data);

      $listContent = [];

      $listContent = $this->mergeLists($listContent, $this->getImagesLists(arrLength($dataFields['images']) ? $dataFields['images'] : []));
      $listContent = $this->mergeLists($listContent, $this->getVideoLists(arrLength($dataFields['video']) ? $dataFields['video'] : []));
      $listContent = $this->mergeLists($listContent, $this->getYoutubeLists(arrLength($dataFields['youtube']) ? $dataFields['youtube'] : []));
      $listContent = $this->mergeLists($listContent, $this->getRunningTextLists(arrLength($dataFields['running_text']) ? $dataFields['running_text'] : []));
      $listContent = $this->mergeLists($listContent, $this->getPengumumanLists(arrLength($dataFields['pengumuman']) ? $dataFields['pengumuman'] : []));

      return [
         'screen' => $data,
         'listContent' => count($listContent) === 1 ? [$listContent[0]] : $listContent
      ];
   }

   private function extractDataFields(array $data): array
   {
      $fieldNames = array_keys($data);
      $dataFields = [];

      foreach ($fieldNames as $field) {
         if (in_array($field, ['images', 'pengumuman', 'running_text', 'video', 'youtube'])) {
            $dataFields[$field] = json_decode($data[$field], true);
         } else {
            $dataFields[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }

      return $dataFields;
   }

   private function mergeLists(array $list1, array $list2): array
   {
      return array_merge($list1, $list2);
   }


   private function getPengumumanLists(array $id): array
   {
      if (!arrLength($id)) {
         return [];
      }

      $table = $this->db->table('tb_pengumuman');
      $table->select('content as value, , \'pengumuman\' as caption, judul');
      $table->whereIn('id', $id);

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            if ($field === 'value') {
               $response[$key][$field] = html_entity_decode($val[$field]);
            } else {
               $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
            }
         }
      }
      return $response;
   }

   private function getRunningTextLists(array $id): array
   {
      if (!arrLength($id)) {
         return [];
      }

      $table = $this->db->table('tb_running_text');
      $table->select('text as value, , \'running_text\' as caption');
      $table->whereIn('id', $id);

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

   private function getYoutubeLists(array $id): array
   {
      if (!arrLength($id)) {
         return [];
      }

      $table = $this->db->table('tb_youtube');
      $table->select('link as value, , \'youtube\' as caption');
      $table->whereIn('id', $id);

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

   private function getVideoLists(array $id): array
   {
      if (!arrLength($id)) {
         return [];
      }

      $table = $this->db->table('tb_video');
      $table->select('video_file as value, , \'video\' as caption, video_type');
      $table->whereIn('id', $id);

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

   private function getImagesLists(array $id): array
   {
      if (!arrLength($id)) {
         return [];
      }

      $table = $this->db->table('tb_mst_images');
      $table->select('filename as value, \'images\' as caption');
      $table->whereIn('id', $id);

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

   public function getImages(): array
   {
      $table = $this->db->table('tb_mst_images');
      $table->orderBy('id', 'desc');

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
