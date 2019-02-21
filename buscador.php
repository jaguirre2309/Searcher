<?php 
//Utilizas valor de name para referirte al elemento selectCiudad y selectTipo 
$ciudad = $_POST["ciudad"];
$tipo = $_POST["tipo"];
$rango = explode(';', $_POST["precio"]);
$precio = $_POST["precio"];
$min = $rango[0];
$max = $rango[1];
?>

<html>
<body>

<script type="text/javascript" src="../js/index.js"></script>

</body>
</html>
