#!/usr/bin/expect -f
spawn ./shell/mysqlClient.sh/
expect "Enter password: "
send "WilsonLOVE\n";
expect "mysql> "
send "use UQPool;\n";
expect "mysql> "
send "source /home/production/UQ-Pool/db/DB_SCHEMA.sql;\n";
expect "mysql> "
send "exit\n";
interact
