# Athena

Collection of useful Athena queries.

[Docs of available functions](https://docs.aws.amazon.com/athena/latest/ug/presto-functions.html)

## Table

```sql
CREATE EXTERNAL TABLE `tracking_data`(
  `date` date,
  `time` string,
  `location` string,
  `bytes` bigint,
  `request_ip` string,
  `method` string,
  `host` string,
  `uri` string,
  `status` int,
  `referrer` string,
  `user_agent` string,
  `query_string` string,
  `cookie` string,
  `result_type` string,
  `request_id` string,
  `host_header` string,
  `request_protocol` string,
  `request_bytes` bigint,
  `time_taken` float,
  `xforwarded_for` string,
  `ssl_protocol` string,
  `ssl_cipher` string,
  `response_result_type` string,
  `http_version` string,
  `fle_status` string,
  `fle_encrypted_fields` int,
  `c_port` int,
  `time_to_first_byte` float,
  `x_edge_detailed_result_type` string,
  `sc_content_type` string,
  `sc_content_len` bigint,
  `sc_range_start` bigint,
  `sc_range_end` bigint)
PARTITIONED BY (
  `year` string,
  `month` string,
  `day` string,
  `dt` date)
ROW FORMAT DELIMITED
  FIELDS TERMINATED BY '\t'
STORED AS INPUTFORMAT
  'org.apache.hadoop.mapred.TextInputFormat'
OUTPUTFORMAT
  'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat'
LOCATION
  's3://porsche-design-system-athena/tracking-data'
TBLPROPERTIES (
  'skip.header.line.count'='2',
  'transient_lastDdlTime'='1617805679');
```

## Views

```sql
CREATE OR REPLACE VIEW s3_athena.quicksight AS
SELECT
  "date" "Date"
, "substr"("query_string", "strpos"("query_string", 'v=') + 2, "strpos"("query_string", '&t') - "strpos"("query_string", 'v=') - 2) "Version"
, "substr"("query_string", "strpos"("query_string", 'c=') + 2, "strpos"("query_string", '&e') - "strpos"("query_string", 'c=') - 2) "Component"
, "substr"("query_string", "strpos"("query_string", 'e=') + 2, "length"("query_string") + 1 - "strpos"("query_string", 'e=') - 2) "Event"
--, "substr"("query_string", "strpos"("query_string", 't=') + 2, "strpos"("query_string", '&c') - "strpos"("query_string", 't=') - 2) "Timestamp"
, "element_at"("split"("substr"("referrer", "strpos"("referrer", '://') + 3), '/'), 1) "Referrer"
, "user_agent" "UserAgent"
FROM s3_athena.tracking_data
WHERE
  "dt" > (current_date - INTERVAL  '30' DAY) AND
  "uri" = '/porsche-design-system.png' AND
  "result_type" = 'Hit' AND
  NOT (
    "referrer" LIKE '%localhost%' OR
    "referrer" LIKE '%192.168.%' OR
    "referrer" LIKE '%127.0.0.1%' OR
    "referrer" LIKE '%d3nll2jx8s265d.cloudfront.net%' OR
    "referrer" LIKE '%aws.designsystem.porsche.com%' OR
    "referrer" LIKE '%0.0.0.0%' OR
    "referrer" = '-'
  )
ORDER BY "date" DESC;
```

## Queries

### General

```sql
SELECT * FROM "s3_access_logs_db"."cloudfront-pixel" WHERE referrer LIKE '%porn%' limit 50;
```

### Manual Partitions

In case partitions could not be created automatically via AWS Lambda function we need to create them manually.  
To verify existing partitions, run this query.

```
SELECT * FROM s3_athena."tracking_data$partitions" WHERE "year"='2022'
```

To generate queries for missing partitions, adjust `generateAthenaPartitionQueries.ts` and execute it via

```
../../node_modules/.bin/ts-node generateAthenaPartitionQueries.ts
```

Then execute the resulting queries (or the ones missing) inside AWS Athena.

### Useful Where Clauses

```sql
-- directly on entire database
WHERE "date" > (current_date - INTERVAL  '30' DAY)

-- via partitions
WHERE "dt" > (current_date - INTERVAL  '30' DAY)
WHERE "year"='2021' AND "month"='04' AND "day"='08'
```