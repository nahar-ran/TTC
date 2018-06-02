<?php

		require_once "connections.php";
?>


	<?php

				$con = new connections();
	
				$iso = $_REQUEST['iso'];
				
				$query = "SELECT `phonecode` FROM `country` WHERE `country`.`iso` = '$iso'";
				
				
				$result = $con->executeQuery($query);
				
				
				while ($row = $result ->fetch_assoc())
					{
						echo $row['phonecode'];
							
					}

				
	
	?>