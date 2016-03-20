#!/bin/bash

timestamp() {
  date +"%Y%m%d%H%M%S"
}

cat > ./src/main/resources/config/liquibase/changelog/$(timestamp)_${1}.xml <<- EOM
<?xml version="1.0" encoding="utf-8"?>
<databaseChangeLog\n
  xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.4.xsd">
  <changeSet id=""$(timestamp)"" author="${2}">
  </changeSet>
</databaseChangeLog>
EOM

open ./src/main/resources/config/liquibase/changelog/$(timestamp)_${1}.xml
