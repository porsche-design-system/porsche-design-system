CREATE OR REPLACE VIEW "cloudfront-pixel" AS
SELECT
  "date" "Date"
, "time" "Time"
, "query_string" "QueryString"
, "substr"("query_string", ("strpos"("query_string", 'v=') + 2), (("strpos"("query_string", '&t') - "strpos"("query_string", 'v=')) - 2)) "Version"
, "substr"("query_string", ("strpos"("query_string", 'c=') + 2), (("strpos"("query_string", '&e') - "strpos"("query_string", 'c=')) - 2)) "Component"
, "substr"("query_string", ("strpos"("query_string", 'e=') + 2), ((("length"("query_string") + 1) - "strpos"("query_string", 'e=')) - 2)) "Event"
, "substr"("query_string", ("strpos"("query_string", 't=') + 2), (("strpos"("query_string", '&c') - "strpos"("query_string", 't=')) - 2)) "Timestamp"
, "referrer" "Referrer"
, "status" "Status"
, "user_agent" "UserAgent"
, "request_ip" "RequestIP"
FROM "s3_access_logs_db"."cloudfront-pixel-raw"
WHERE ("Date" > (current_date - INTERVAL  '30' DAY))
ORDER BY "Timestamp" DESC;



CREATE OR REPLACE VIEW "cloudfront-pixel-raw" AS
SELECT
  "date"
, "time"
, "request_ip"
, "query_string"
, "status"
, "referrer"
, "user_agent"
FROM "s3_access_logs_db"."cloudfront_logs"
WHERE (((((((
(("uri" = '/porsche-design-system.png') AND
("result_type" = 'Hit')) AND
(NOT ("referrer" LIKE '%localhost%'))) AND
(NOT ("referrer" LIKE '%192.168.%'))) AND
(NOT ("referrer" LIKE '%127.0.0.1%'))) AND
(NOT ("referrer" LIKE '%d3nll2jx8s265d.cloudfront.net%'))) AND
(NOT ("referrer" LIKE '%aws.designsystem.porsche.com%'))) AND
(NOT ("referrer" LIKE '%0.0.0.0%'))) AND
("referrer" <> '-'))
ORDER BY "date" DESC;
