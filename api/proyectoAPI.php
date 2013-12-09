<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/proyectos', 'getProyectos');
$app->get('/proyectos/propietario/:id',	'getProyectosPropietario');
$app->get('/proyectos/colaborador/:id',	'getProyectosColaborador');
$app->delete('/proyecto/:idProyecto/colaborador/:idUser','deleteColaboradorProyecto');
$app->get('/proyecto/:id',	'getProyecto');
$app->get('/imagenes/:id',	'getImagenes');
$app->get('/proyectos/search/:query', 'findByName');
$app->post('/imagenes', 'addImage');
$app->post('/proyecto', 'addProyecto');
$app->put('/proyecto/:id', 'updateProyecto');
$app->delete('/proyecto/:id','deleteProyecto');
$app->post('/proyecto/:idProyecto/colaborador/:idUser', 'addColaborador');

$app->run();



function addColaborador($idProyecto,$idUser) {
	error_log('addColaborador\n', 3, 'php.log');
	$request = Slim::getInstance()->request();
	$colaborador = json_decode($request->getBody());
	$sqlColaborador = "INSERT INTO garaje_proyecto_colaborador(idProyecto, idUser) 
					   VALUES (:idProyecto, :idUser)";
	
	try {
		$db = getConnection();
		$stmt = $db->prepare($sqlColaborador);  
		$stmt->bindParam("idProyecto", $colaborador->proyectoId);
		$stmt->bindParam("idUser", $colaborador->userId);		
		$stmt->execute();
		
		$db = null;

		echo json_encode($colaborador); 
		
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, 'php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteColaboradorProyecto($idProyecto,$idUser) {
	$sql = "DELETE FROM garaje_proyecto_colaborador 
			WHERE idProyecto=:idProyecto AND idUser=:idUser";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("idProyecto", $idProyecto);
		$stmt->bindParam("idUser", $idUser);
		$stmt->execute();
		$db = null;
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


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

function getProyectosPropietario($idUser) {
	$sql = "SELECT * FROM garaje_proyecto, garaje_imagenproyecto, garaje_proyecto_propietario
			WHERE garaje_proyecto.idProyecto = garaje_imagenproyecto.idProyecto 
			AND garaje_proyecto.idProyecto = garaje_proyecto_propietario.idProyecto 
			AND garaje_proyecto_propietario.idUser=:idUser
			AND garaje_imagenproyecto.principal=1 ORDER BY nombre";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("idUser", $idUser);
		$stmt->execute(); 	
		$proyectos = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		
		echo  json_encode($proyectos);
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'.'Reading Error '. $e->getMessage() .'}}'; 
	}
}

function getProyectosColaborador($idUser) {
	$sql = "SELECT * FROM garaje_proyecto, garaje_imagenproyecto, garaje_proyecto_colaborador
			WHERE garaje_proyecto.idProyecto = garaje_imagenproyecto.idProyecto 
			AND garaje_proyecto.idProyecto = garaje_proyecto_colaborador.idProyecto 
			AND garaje_proyecto_colaborador.idUser=:idUser
			AND garaje_imagenproyecto.principal=1 ORDER BY nombre";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("idUser", $idUser);
		$stmt->execute(); 	
		$proyectos = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		
		echo  json_encode($proyectos);
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'.'Reading Error '. $e->getMessage() .'}}'; 
	}
}

function getProyecto($id) {
	$sql = "SELECT p.idProyecto, p.nombre, p.estaActivo, p.descripcion, p.comentarios, p.URL, u.username as propietario
			FROM garaje_proyecto as p, garaje_proyecto_propietario as o, garaje_user as u
			WHERE p.idProyecto = :id
			AND o.idProyecto = p.idProyecto
			AND o.idUser = u.idUser";
	$sqlColaboradores = "SELECT u.idUser, u.username, u.email
			FROM garaje_proyecto as p, garaje_proyecto_colaborador as c, garaje_user as u
			WHERE p.idProyecto = :id
			AND c.idProyecto = p.idProyecto
			AND c.idUser = u.idUser";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$proyecto = $stmt->fetchObject(); 

		$stmt = $db->prepare($sqlColaboradores); 
		$stmt->bindParam("id", $id);	
		$stmt->execute();
		$colaboradores = $stmt->fetchAll(PDO::FETCH_OBJ);
		foreach ($colaboradores as &$colaborador){
			$colaborador->imagen = get_gravatar($colaborador->email,80);		
		}
		$proyecto->colaboradores = $colaboradores;
		
		$db = null;
		
		echo json_encode($proyecto); 
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'.'Reading Error '. $e->getMessage() .'}}'; 
	}
}


function getImagenes($id) {
	$sql = "SELECT * FROM garaje_imagenproyecto 
			WHERE idProyecto=:id 
			ORDER BY principal DESC, numImagen ASC";
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
	$sqlPropietario = "INSERT INTO garaje_proyecto_propietario(idProyecto, idUser) 
		   VALUES (:idProyecto, :idUser)";
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

		$stmt = $db->prepare($sqlPropietario);  
		$stmt->bindParam("idProyecto", $proyecto->idProyecto);
		$stmt->bindParam("idUser", $proyecto->idUser);
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
	$sql = "SELECT * FROM garaje_proyecto 
			WHERE UPPER(nombre) LIKE :query 
			ORDER BY nombre";
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

/**
 * Get either a Gravatar URL or complete image tag for a specified email address.
 *
 * @param string $email The email address
 * @param string $s Size in pixels, defaults to 80px [ 1 - 2048 ]
 * @param string $d Default imageset to use [ 404 | mm | identicon | monsterid | wavatar ]
 * @param string $r Maximum rating (inclusive) [ g | pg | r | x ]
 * @param boole $img True to return a complete IMG tag False for just the URL
 * @param array $atts Optional, additional key/value attributes to include in the IMG tag
 * @return String containing either just a URL or a complete image tag
 * @source http://gravatar.com/site/implement/images/php/
 */
function get_gravatar( $email, $s = 80, $d = 'mm', $r = 'g', $img = false, $atts = array() ) {
    $url = 'http://www.gravatar.com/avatar/';
    $url .= md5( strtolower( trim( $email ) ) );
    $url .= "?s=$s&d=$d&r=$r";
    if ( $img ) {
        $url = '<img src="' . $url . '"';
        foreach ( $atts as $key => $val )
            $url .= ' ' . $key . '="' . $val . '"';
        $url .= ' />';
    }
    return $url;
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