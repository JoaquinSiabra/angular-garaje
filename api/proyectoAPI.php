<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/proyectos', 'getProyectos');
$app->get('/proyectos/:id',	'getProyecto');
$app->get('/imagenes/:id',	'getImagenes');
$app->get('/proyectos/search/:query', 'findByName');
$app->post('/imagenes', 'addImage');
$app->post('/proyectos', 'addProyecto');
$app->put('/proyectos/:id', 'updateProyecto');
$app->delete('/proyectos/:id','deleteProyecto');

$app->run();



function getProyectos() {
	$sql = "SELECT * FROM garaje_proyecto, garaje_imagenproyecto 
			WHERE garaje_proyecto.idProyecto = garaje_imagenproyecto.idProyecto 
			AND garaje_imagenproyecto.principal=1 ORDER BY nombre";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$proyectos = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		
		echo  json_encode($proyectos);
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'.'Reading Error '. $e->getMessage() .'}}'; 
	}
}

function getProyecto($id) {
	$sql = "SELECT * FROM garaje_proyecto WHERE idProyecto=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$proyecto = $stmt->fetchObject();  
		$db = null;
		
		echo json_encode($proyecto); 
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'.'Reading Error '. $e->getMessage() .'}}'; 
	}
}


function getImagenes($id) {
	$sql = "SELECT * FROM garaje_imagenproyecto WHERE idProyecto=:id ORDER BY principal DESC, numImagen ASC";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql); 
		$stmt->bindParam("id", $id);
		$stmt->execute(); 	
		$images = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		
		echo  json_encode($images);
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function addProyecto() {
	error_log('addProyecto\n', 3, 'php.log');
	$request = Slim::getInstance()->request();
	$proyecto = json_decode($request->getBody());
	$sql = "INSERT INTO garaje_proyecto(nombre, estaActivo, descripcion, comentarios) 
		   VALUES (:nombre, :estaActivo, :descripcion,:comentarios)";
	$sqlImagen = "INSERT INTO garaje_imagenproyecto(idProyecto, numImagen, principal) 
		   VALUES (:idProyecto, '1', '1')";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("nombre", $proyecto->nombre);
		$stmt->bindParam("estaActivo", $proyecto->estaActivo);
		$stmt->bindParam("descripcion", $proyecto->descripcion);
		$stmt->bindParam("comentarios", $proyecto->comentarios);
		$stmt->execute();
		
		$proyecto->idProyecto = $db->lastInsertId();		
		$stmt = $db->prepare($sqlImagen);  
		$stmt->bindParam("idProyecto", $proyecto->idProyecto);
		$stmt->execute();		
		
		$db = null;

		echo json_encode($proyecto); 
		
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, 'php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateProyecto($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$proyecto= json_decode($body);
	$sql = "UPDATE garaje_proyecto 
		SET estaActivo=:estaActivo,
		nombre=:nombre, comentarios=:comentarios 
		WHERE idProyecto=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->bindParam("estaActivo", $proyecto->estaActivo);
		$stmt->bindParam("nombre", $proyecto->nombre);
		$stmt->bindParam("comentarios", $proyecto->comentarios);
		$stmt->execute();
		$db = null;
		
		echo json_encode($proyecto); 
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'.	$body .'Update Error '.  $e->getMessage() .'}}'; 
	}
}

function deleteProyecto($id) {
	$sql = "DELETE FROM garaje_proyecto WHERE idProyecto=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByName($query) {
	$sql = "SELECT * FROM garaje_proyecto WHERE UPPER(nombre) LIKE :query ORDER BY nombre";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$proyectos = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		
		echo  json_encode($proyectos);
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}



function addImage() {
	error_log('addImage\n', 3, 'php.log');
	$request = Slim::getInstance()->request();
	$proyecto = json_decode($request->getBody());
	
	$sqlMaxNumImagen = "SELECT max(numImagen) numMax FROM `garaje_imagenproyecto` WHERE idProyecto=:idProyecto";
	$sqlImagen = "INSERT INTO garaje_imagenproyecto(idProyecto, numImagen, URLImagen, principal) 
				  VALUES (:idProyecto, :numImagen, :URLImagen, '1')";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sqlMaxNumImagen);  
		$stmt->bindParam("idProyecto", $id);	
		$stmt->execute();		
		$numMax = $stmt->fetchObject(); 
		if ($numMax->numMax === null){
			$numMax->numMax = 0;
		}
		
		$stmt = $db->prepare($sqlImagen);  
		$stmt->bindParam("idProyecto", $proyecto->idProyecto);
		$stmt->bindParam("numImagen", $numMax->numMax+1);
		$stmt->bindParam("URLImagen", $proyecto->URLImagen);
		$stmt->execute();
		$db = null;

		echo json_encode($proyecto); 
		
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, 'php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="pmcchs2012";
	$dbname="test";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>