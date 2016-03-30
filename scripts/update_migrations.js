'use strict';

var fs = require('fs');
var path = require('path');

const liquibase = path.join(
  './',
  'src',
  'main',
  'resources',
  'config',
  'liquibase'
);

let entries = "";
fs.readdir(path.join(liquibase, 'changelog'), (err, items) => {
  items.forEach(item => {
    if (item.split('.').pop() === 'xml') {
      entries += `      <include file="classpath:config/liquibase/changelog/${item}" relativeToChangelogFile="false"/>\n`;
    }
  });
  fs.writeFile(
    path.join(liquibase, 'master.xml'),
`<?xml version="1.0" encoding="utf-8"?>
  <databaseChangeLog
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.4.xsd">
${entries}
  </databaseChangeLog>`
  );
});
