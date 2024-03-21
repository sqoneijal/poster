<!DOCTYPE html>
<html lang="en" data-bs-theme="light">

<head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title><?php echo $title; ?></title>
   <link rel="shortcut icon" href="/getfile/small-logo.png" />
   <?php
   echo link_tag('https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700');
   echo $cssTag;
   ?>
</head>

<body class="app-blank bgi-size-cover bgi-attachment-fixed bgi-position-center" style="background-image: url(/bundle/assets/bg10.jpeg);">
   <div class="d-flex flex-column flex-root" id="kt_app_root"></div>
   <script>
      var TOKEN = '<?php echo csrf_hash(); ?>';
   </script>
   <?php echo $scriptTag; ?>
</body>

</html>