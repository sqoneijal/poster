<?php

use CodeIgniter\Router\RouteCollection;

$session = \Config\Services::session();

api($routes);
function api(RouteCollection $routes)
{
   $routes->group('api', function ($routes) {
      $routes->get('images', 'Api::images');
      $routes->get('playlist/(:any)', 'Api::playlist/$1');
   });
}

$routes->get('logout', 'Login::logout');
$routes->get('initpage', 'Login::initPage');
$routes->get('getfile/images/(:any)', 'GetFile::images/$1');
$routes->get('getfile/(:any)', 'GetFile::index/$1');

if (!empty($session->get('id'))) {
   dashboard($routes);
   content($routes);
   screen($routes);
   playlist($routes);
} else {
   $routes->get('/', 'Login::index');

   $routes->post('submit', 'Login::submit');
}

function playlist(RouteCollection $routes)
{
   $routes->group('playlist', function ($routes) {
      $routes->get('/', 'Playlist::index');
      $routes->get('initpage', 'Playlist::initPage');
      $routes->get('getdaftarimages', 'Playlist::getDaftarImages');
      $routes->get('getdaftarvideo', 'Playlist::getDaftarVideo');
      $routes->get('getdaftaryoutube', 'Playlist::getDaftarYoutube');
      $routes->get('getdaftarrunningtext', 'Playlist::getDaftarRunningText');
      $routes->get('getdaftarpengumuman', 'Playlist::getDaftarPengumuman');

      $routes->post('submit', 'Playlist::submit');
      $routes->post('getdata', 'Playlist::getData');
      $routes->post('hapus', 'Playlist::hapus');
      $routes->post('handlesetscreen', 'Playlist::handleSetScreen');
      $routes->post('submitcontent', 'Playlist::submitContent');
   });
}

function dashboard(RouteCollection $routes): void
{
   $routes->get('/', 'Dashboard::index', ['filter' => 'IsLogin']);
}

function screen(RouteCollection $routes): void
{
   $routes->group('screen', function ($routes) {
      $routes->get('/', 'Screen');

      $routes->post('getdata', 'Screen::getData');
      $routes->post('submit', 'Screen::submit');
      $routes->post('hapus', 'Screen::hapus');
   });
}

function contentImages(RouteCollection $routes): void
{
   $routes->group('images', function ($routes) {
      $routes->get('/', 'Images::index');

      $routes->post('submit', 'Images::submit');
      $routes->post('getdata', 'Images::getData');
      $routes->post('hapus', 'Images::hapus');
      $routes->post('updateorigname', 'Images::submitOrigName');
   });
}

function contentYoutube(RouteCollection $routes)
{
   $routes->group('youtube', function ($routes) {
      $routes->get('/', 'Youtube::index');

      $routes->post('submit', 'Youtube::submit');
      $routes->post('getdata', 'Youtube::getData');
      $routes->post('hapus', 'Youtube::hapus');
   });
}

function contentRunningText(RouteCollection $routes)
{
   $routes->group('runningtext', function ($routes) {
      $routes->get('/', 'RunningText::index');

      $routes->post('submit', 'RunningText::submit');
      $routes->post('getdata', 'RunningText::getData');
      $routes->post('hapus', 'RunningText::hapus');
   });
}

function content(RouteCollection $routes): void
{
   $routes->group('content', ['namespace' => 'App\Controllers\Content', 'filter' => 'IsLogin'], function ($routes) {
      contentImages($routes);
      contentYoutube($routes);
      contentRunningText($routes);
      contentPengumuman($routes);
      contentVideo($routes);
   });
}

function contentVideo(RouteCollection $routes): void
{
   $routes->group('video', function ($routes) {
      $routes->get('/', 'Video::index');

      $routes->post('submit', 'Video::submit');
      $routes->post('getdata', 'Video::getData');
      $routes->post('hapus', 'Video::hapus');
      $routes->post('updateorigname', 'Video::updateOrigName');
   });
}

function contentPengumuman(RouteCollection $routes): void
{
   $routes->group('pengumuman', function ($routes) {
      $routes->get('/', 'Pengumuman::index');

      $routes->post('submit', 'Pengumuman::submit');
      $routes->post('getdata', 'Pengumuman::getData');
      $routes->post('hapus', 'Pengumuman::hapus');
   });
}
