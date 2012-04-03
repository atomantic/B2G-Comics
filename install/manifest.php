<?php
header('Content-type: application/x-web-app-manifest+json');
echo file_get_contents('../manifest.json');