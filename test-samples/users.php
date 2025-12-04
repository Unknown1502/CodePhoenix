<?php
/**
 * Legacy User Management System
 * Version: 1.0 (PHP 5.2 era)
 * WARNING: Contains multiple security vulnerabilities for demonstration
 */

// Direct database connection (deprecated mysql_* functions)
$db_host = "localhost";
$db_user = "root";
$db_pass = "password123";  // Hardcoded credentials!
$db_name = "company_db";

mysql_connect($db_host, $db_user, $db_pass) or die("Connection failed");
mysql_select_db($db_name);

// Get user input directly from URL (SQL injection vulnerability!)
$user_id = $_GET['id'];
$action = $_POST['action'];

// Build SQL query with unsanitized input
$query = "SELECT * FROM users WHERE id = $user_id";  // SQL INJECTION!
$result = mysql_query($query);

// Handle user actions
if ($action == "delete") {
    // No CSRF protection!
    $delete_query = "DELETE FROM users WHERE id = $user_id";  // SQL INJECTION!
    mysql_query($delete_query);
    echo "<div class='success'>User deleted successfully!</div>";
}

// Display user data
echo "<html>";
echo "<head><title>User Management</title></head>";
echo "<body>";
echo "<h1>User Management System (Legacy)</h1>";

if (!$result) {
    echo "<p>Error: " . mysql_error() . "</p>";
} else {
    while($row = mysql_fetch_array($result)) {
        echo "<div class='user-card'>";
        echo "<h2>" . $row['name'] . "</h2>";  // No XSS protection!
        echo "<p><strong>Email:</strong> " . $row['email'] . "</p>";
        echo "<p><strong>Role:</strong> " . $row['role'] . "</p>";
        echo "<p><strong>Created:</strong> " . $row['created_at'] . "</p>";
        
        // Dangerous delete form
        echo "<form method='post' action=''>";
        echo "<input type='hidden' name='action' value='delete'>";
        echo "<button type='submit' onclick=\"return confirm('Delete this user?')\">Delete User</button>";
        echo "</form>";
        echo "</div>";
        echo "<hr>";
    }
}

echo "</body>";
echo "</html>";

// Close connection
mysql_close();
?>
