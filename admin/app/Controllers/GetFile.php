<?php

namespace App\Controllers;

use CodeIgniter\Files\File;

class GetFile extends BaseController
{

   protected $allowedMimes = [
      'image/png', 'image/x-png', 'image/jpeg', 'image/pjpeg', 'image/x-icon', 'image/x-ico', 'image/vnd.microsoft.icon', 'application/pdf', 'image/svg+xml', 'image/svg', 'application/xml', 'text/xml', 'image/gif', 'video/mp4', 'video/x-f4v', 'video/webm', 'video/ogg'
   ];
   protected $allowedExt = ['png', 'jpg', 'jpeg', 'ico', 'pdf', 'svg', 'gif', 'mp4', 'f4v', 'webm', 'ogg'];

   public function index($filename = null)
   {
      $path = WRITEPATH . 'uploads/' . $filename;
      if (!file_exists($path)) {
         throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
      }

      $info = new File($path);
      $handle = fopen($path, "rb");
      $contents = fread($handle, filesize($path));
      if (!in_array($info->getMimeType(), $this->allowedMimes) && !in_array($info->guessExtension(), $this->allowedExt)) {
         throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
      }

      fclose($handle);
      $this->response
         ->setHeader('content-type', $info->getMimeType())
         ->setHeader('Accept-Ranges', 'bytes')
         ->setHeader('Last-Modified', date("D, d M Y H:i:s e", filemtime($path)));
      echo $contents;
   }

   public function images($filename = null)
   {
      $path = WRITEPATH . 'uploads/images/' . $filename;
      if (!file_exists($path)) {
         throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
      }

      $info = new File($path);
      $handle = fopen($path, "rb");
      $contents = fread($handle, filesize($path));
      if (!in_array($info->getMimeType(), $this->allowedMimes) && !in_array($info->guessExtension(), $this->allowedExt)) {
         throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
      }

      fclose($handle);
      $this->response
         ->setHeader('content-type', $info->getMimeType())
         ->setHeader('Accept-Ranges', 'bytes')
         ->setHeader('Last-Modified', date("D, d M Y H:i:s e", filemtime($path)));
      echo $contents;
   }
}
