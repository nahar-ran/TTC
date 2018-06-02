<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, 
    X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");


?>



<?php

			
				
						
			$firstName =  $_REQUEST['firstName'];
				
			$lastName =  $_REQUEST['lastName'];
				
			$email =  $_REQUEST['email'];

			$password =  $_REQUEST['password'];
			
			$phone = $_REQUEST['phoneNumber'];
		
			$campaign =  $_REQUEST['campaign'];
			
			$module = 'customer';
			
			$country = $_REQUEST['country'];
			
			
			$api_password = 'NuaCiTrh123';
			
			
			$api_username = 'moshanapi';
		
			
			$url = 'https://crm.toptencoin.com/api';
				$data = array('firstName' => $firstName ,'lastName' => $lastName, 'email' => $email, 'password' => $password, 'module' => 		
				$module,'api_password' =>$api_password,'api_username'=>$api_username,'campaign'=>$campaign,'country'=>$country,'command'=>'add', 'phone'=>$phone);
				$options = array(
					    'http' => array(
					    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
					    'method'  => 'POST',
				        'content' => http_build_query($data)
						    )
							);
						$context  = stream_context_create($options);
						$result = file_get_contents($url, false, $context);
						if ($result === FALSE) { 
						
									var_dump($http_response_header);
	
						
						 }
	
	
		echo $result;



?>