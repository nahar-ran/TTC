<?php

	class connections{
	
	public $servername;
	public $username;
	public $password;
	public $dbname; 


		function __construct()
		{
			
			$this->servername = "localhost";
			$this->username = "nahar_dev";
			$this->password = "passmein.com";
			$this->dbname = "countries_data";
	
			$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
			
			

			
			
		}
		
		
		
		
		function executeQuery($query)
		
		{
			
			$result = $this->conn->query($query);
			
			
			if($this->conn->insert_id)
			
			return $this->conn->insert_id;
			
			echo mysqli_error();
						
			return $result;				
			

    		}
    
    }
    
    
    ?>