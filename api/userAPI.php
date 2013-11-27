<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/users', 'getUsers');
$app->get('/users/:id',	'getUser');
$app->get('/users/search/:query', 'findByName');
$app->post('/users', 'addUser');
$app->put('/users/:id', 'updateUser');
$app->delete('/users/:id','deleteUser');
$app->post('/login','loginUser');

$app->run();


function getUsers() {
	$sql = "SELECT * FROM garaje_user ORDER BY username";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$users = $stmt->fetchAll(PDO::FETCH_OBJ);
		foreach ($users as &$user){
			$user->imagen = get_gravatar($user->email,80);		
		}
		$db = null;
		
		echo  json_encode($users);
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'.'Reading Error '. $e->getMessage() .'}}'; 
	}
}

function getUser($id) {
	$sql = "SELECT *
			FROM garaje_user WHERE idUser=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$user = $stmt->fetchObject(); 
		$user->imagen = get_gravatar($user->email,120);		
		$db = null;

		echo json_encode($user); 
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'.'Reading Error '. $e->getMessage() .'}}'; 
	}
}

function loginUser() {
	error_log('loginUser\n', 3, 'php.log');
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	$sql = "SELECT username,password,idUser
			FROM garaje_user WHERE username=:username AND password=:password";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("username", $user->username);
		$stmt->bindParam("password", $user->password);
		$stmt->execute();
		$user = $stmt->fetchObject(); 
		$db = null;

		echo json_encode($user); 
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'.'Reading Error '. $e->getMessage() .'}}'; 
	}
}


function addUser() {
	error_log('addProyecto\n', 3, 'php.log');
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	$sql = "INSERT INTO garaje_user(nombre, apellidos, bio, email, username, password) 
		   VALUES (:nombre, :apellidos, :bio, :email, :username, :password)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("nombre", $user->nombre);
		$stmt->bindParam("apellidos", $user->apellidos);
		$stmt->bindParam("bio", $user->bio);
		$stmt->bindParam("email", $user->email);
		$stmt->bindParam("username", $user->username);
		$stmt->bindParam("password", $user->password);
		$stmt->execute();
		//$user->idUser = $db->lastInsertId();	
		$db = null;
		
		echo json_encode($user);
		
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, 'php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateUser($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$user= json_decode($body);
	$sql = "UPDATE garaje_user 
		SET nombre=:nombre,
		apellidos=:apellidos, bio=:bio, email=:email, 
		username=:username , password=:password 
		WHERE idUser=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->bindParam("nombre", $user->nombre);
		$stmt->bindParam("apellidos", $user->apellidos);
		$stmt->bindParam("bio", $user->bio);
		$stmt->bindParam("email", $user->email);
		$stmt->bindParam("username", $user->username);
		$stmt->bindParam("password", $user->password);
		$stmt->execute();
		$db = null;
		
		echo json_encode($user); 
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'.	$body .'Update Error '.  $e->getMessage() .'}}'; 
	}
}

function deleteUser($id) {
	$sql = "DELETE FROM garaje_user WHERE idUser=:id";
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
	$sql = "SELECT *
			FROM garaje_user WHERE UPPER(username) LIKE :query ORDER BY username";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$user= $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		
		echo  json_encode($user);
		
	} catch(PDOException $e) {
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