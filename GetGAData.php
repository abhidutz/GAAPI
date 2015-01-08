<?php

require_once '/google-api-php-client-master/src/Google/Client.php';
require_once '/google-api-php-client-master/src/Google/Service.php';
require_once '/google-api-php-client-master/src/Google/Service/Analytics.php';
include_once "/google-api-php-client-master/examples/templates/base.php";

session_start();
echo "<!DOCTYPE html><html><head><script src='http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script><script src='http://localhost/api/api.js'></script></head><body><img id='loading' style='left:50%' src='/api/loading.gif'/><div id='content' style='display:none;'> <p class='t'>Total</p><p class='one'>www.privatefloor.com</p><p class='two'> www.privatefloor.co.uk</p><p class='three'>PrivatefloorES</p>";
/*
/Add keys from google developer console after registering your app with google
/
/
*/
$client = new Google_Client();
$client->setApplicationName('Hello Analytics API Sample');

$client->setClientId('Add your google developer ID here');//done
$client->setClientSecret('Add your secret key here. From google developer console');//done
$client->setDeveloperKey('Add your developer key here. From google developer console');//done
$client->setAccessType('offline');
$client->setRedirectUri('http://localhost/api/HelloAnalyticsApi.php');//change as per your needs
$client->setScopes(array('https://www.googleapis.com/auth/analytics.readonly'));

if (isset($_GET['code'])) {
$client->authenticate($_GET['code']);//made change, passed code variable
$_SESSION['token'] = $client->getAccessToken();
$redirect = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));

if (isset($_SESSION['token'])) {
  $client->setAccessToken($_SESSION['token']);
}


if (!$client->getAccessToken()) {
  $authUrl = $client->createAuthUrl();
  print "<a class='login' href='$authUrl'>Connect Me!</a>";

} else {
  $analytics = new Google_Service_Analytics($client);
  runMainDemo($analytics);
  echo "<script>getWeekCompare();</script>";
 
}
echo "<link rel='stylesheet' type='text/css' href='http://localhost/api/styles.css'>
</div>
<script>$('#content').show();$('#loading').hide(); </script>

</body></html>";














/* function runMainDemo continued in next section.
/ Add your profile id's here in array.
/ This app. is designed for three ID's only.
*/
function runMainDemo(&$analytics) {
$profiles = array(
					"11111111",
					"22222222",
					"33333333"
					);


  try {
    

	$profileIndex=0;
	$today = date("Y-m-d"); 
	foreach($profiles as $pid)
	{
	
	$today = date("Y-m-d"); 
		$yesterday= date('Y-m-d', strtotime('-1 days'));	
		
	$results = getResults($analytics, $pid,$today,$today,
		"ga:sessions,ga:transactions,ga:transactionRevenue",array("dimensions"=>'ga:medium',"max-results"=>10,"sort"=>"-ga:sessions"));
		printResults($results,$profileIndex,"today");
		
	//for last 7 days
	//echo "<p><strong>Last Week</strong></p>";
	$yesterDay= date('Y-m-d', strtotime('-1 days'));
	$eightDaysAgo= date('Y-m-d', strtotime('-8 days'));	
		$results = getResults($analytics, $pid,$eightDaysAgo,$yesterDay,
		"ga:sessions,ga:transactions,ga:transactionRevenue",array("dimensions"=>'ga:medium',"max-results"=>10,"sort"=>"-ga:sessions"));
		printResults($results,$profileIndex,"lastWeek");
		
		//for 14-7 days
	//echo "<p><strong>Previous Week</strong></p>";
	$fifteenDaysAgo= date('Y-m-d', strtotime('-15 days'));	
		$results = getResults($analytics, $pid,$fifteenDaysAgo,$eightDaysAgo,
		"ga:sessions,ga:transactions,ga:transactionRevenue",array("dimensions"=>'ga:medium',"max-results"=>10,"sort"=>"-ga:sessions"));
		printResults($results,$profileIndex,"prevWeek");
			
		//for last 31-1 days
	//echo "<p><strong>Last 30 Days </strong></p>";
	$thirtyOneDaysAgo= date('Y-m-d', strtotime('-31 days'));	
		$results = getResults($analytics, $pid,$thirtyOneDaysAgo,$yesterDay,
		"ga:sessions,ga:transactions,ga:transactionRevenue",array("dimensions"=>'ga:medium',"max-results"=>10,"sort"=>"-ga:sessions"));
		printResults($results,$profileIndex,"lastMonth");
		
		//for last 31-1 days
	//echo "<p><strong>Last 60-30 Days </strong></p>";
	$sixtyOneDaysAgo= date('Y-m-d', strtotime('-61 days'));	
		$results = getResults($analytics, $pid,$sixtyOneDaysAgo,$thirtyOneDaysAgo,
		"ga:sessions,ga:transactions,ga:transactionRevenue",array("dimensions"=>'ga:medium',"max-results"=>10,"sort"=>"-ga:sessions"));
		printResults($results,$profileIndex,"prevMonth");
		
//for Detailed last 30 days
	//echo "<p><strong>Detail Last 30 Days</strong></p>";
		$results = getResults($analytics, $pid,$thirtyOneDaysAgo,$yesterDay,
		"ga:sessions,ga:transactions,ga:transactionRevenue",array("dimensions"=>'ga:date'));
		printResults($results,$profileIndex,"detailMonth");
		
//for Detailed Months
$aYearAgo= date('Y-m-d', strtotime('-365 days'));
	//echo "<p><strong>Monthly Stats.</strong></p>";
		$results = getResults($analytics, $pid,$aYearAgo,$yesterDay,
		"ga:sessions,ga:transactions,ga:transactionRevenue",array("dimensions"=>'ga:yearMonth'));
		printResults($results,$profileIndex,"detailYear");

		
		
	$profileIndex++;
	


  } catch (apiServiceException $e) {
    // Error from the API.
    print 'There was an API error : ' . $e->getCode() . ' : ' . $e->getMessage();

  } catch (Exception $e) {
    print 'There wan a general error : ' . $e->getMessage();
  }
}

function getFirstprofileId(&$analytics) {
  $accounts = $analytics->management_accounts->listManagementAccounts();

  if (count($accounts->getItems()) > 0) {
    $items = $accounts->getItems();
    $firstAccountId = $items[0]->getId();

    $webproperties = $analytics->management_webproperties
        ->listManagementWebproperties($firstAccountId);

    if (count($webproperties->getItems()) > 0) {
      $items = $webproperties->getItems();
      $firstWebpropertyId = $items[0]->getId();

      $profiles = $analytics->management_profiles
          ->listManagementProfiles($firstAccountId, $firstWebpropertyId);

      if (count($profiles->getItems()) > 0) {
        $items = $profiles->getItems();
        return $items[0]->getId();

      } else {
        throw new Exception('No views (profiles) found for this user.');
      }
    } else {
      throw new Exception('No webproperties found for this user.');
    }
  } else {
    throw new Exception('No accounts found for this user.');
  }
}

function getResults(&$analytics, $profileId,$startDate,$endDate,$metrics,$oparms=array()) {
   return $analytics->data_ga->get(
       'ga:' . $profileId,
	   $startDate,
       $endDate,
       $metrics,
	   $oparms
	   );
}

function printResults(&$results,$cnt,$type) {
  if (count($results->getRows()) > 0) {
  
    $profileName = $results->getProfileInfo()->getProfileName();
    $rows = $results->getRows();
    $sessions = $rows[0][0];
	
	$col1="Medium";
	if($type==="detailMonth")
	$col1="Date";
	if($type==="detailYear")
	{
	$col1="Month";
	}
	
	echo "<table border='2' class='table$cnt$type'><tr><td colspan='4' align='center'>$type</td></tr><tr><th>$col1</th><th>Sessions</th><th>Transactions</th><th>Revenue</th>";
	foreach($rows as $row){

	if($type==="detailMonth")
	$dem=date('Y-m-d', strtotime($row[0]));
	else
	$dem=$row[0];
	if($type==="detailYear")
	{	
		$dateObj   = DateTime::createFromFormat('!m', substr($row[0],4));
		$dem = $dateObj->format('F'); // March
		$dem=$dem."-".substr($row[0],2,2);
	}
	$dem=str_replace(')','',str_replace('(','',$dem));
	echo "<tr><td class='$cnt $type"."i'>".$dem."</td><td class='$cnt $type $dem session'>".$row[1]."</td><td class='$cnt $type $dem trans'>".$row[2]."</td><td class='$cnt $type $dem rev'>".$row[3]."</td></tr>";

	}
	echo "</table>";
  } else {
    print "<table class='table$cnt$type'><tr><td><p>No results found.</p></td></tr></table>";
  }	
}
?>
