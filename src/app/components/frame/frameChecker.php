<?php

$allowsiframe=true;
$urlhere=$_POST["url"];
$ch = curl_init();

$options = array(
    CURLOPT_URL            => $urlhere,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER         => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING       => "",
    CURLOPT_AUTOREFERER    => true,
    CURLOPT_CONNECTTIMEOUT => 120,
    CURLOPT_TIMEOUT        => 120,
    CURLOPT_MAXREDIRS      => 10,
);

curl_setopt_array($ch, $options);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch);
$headers=substr($response, 0, $httpCode['header_size']);

if(stripos($headers, 'X-Frame-Options: deny')>-1||stripos($headers, 'X-Frame-Options: SAMEORIGIN')>-1) {
    $allowsiframe=false;
}

$httpcode= curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);
echo json_encode(array('httpcode'=>$httpcode, 'allowsiframe'=>$allowsiframe));

?>