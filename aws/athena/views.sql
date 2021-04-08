
WHERE "Date" > (current_date - INTERVAL  '30' DAY)
WHERE "year"='2021' AND "month"='04' AND "day"='08'



CREATE OR REPLACE VIEW "quicksight" AS
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
ORDER BY "date" DESC
LIMIT 10;
