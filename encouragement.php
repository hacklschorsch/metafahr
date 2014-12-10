<?php
	/* Thanks to https://github.com/kstoltzenburg */

    $fp = fopen('../encouragements.txt', 'a');

    if ($fp == false) {
        header('HTTP/1.1 500 Internal Server Error');
        die("Could not open file for writing.");
    }

    fputcsv($fp, array_values($_POST));
    fclose($fp);

    $to  = 'encouragements@metafahr.de';
    $subject = 'New encouragement for metafahr!';
    $message = "Aloha!\r\nNew encouragement for metafahr:\r\n" . $_POST['encouragement'] . "\r\n";
    $message = wordwrap($message, 70, "\r\n");

    mail($to, $subject, $message);
?>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title>MetaFahr - encouragement received</title>
    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.2.0/pure-min.css" />
    <link rel="stylesheet" href="screen.css" />
</head>
<body>
    <div id="container">
        <div id="query">
            <div id="logo"><h1>MetaFahr</h1></div>
			<p>Thanks!</p>
        </div>
    </div>

    <script src="js/main.js"></script>
</body>
</html>
