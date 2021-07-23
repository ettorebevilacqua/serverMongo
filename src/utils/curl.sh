curl -X 'POST' \
  'http://localhost:3010/v1/moduli' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGViMWIwN2Q2NzQ1ODY4NzA3ZGU1YTMiLCJpYXQiOjE2MjYxNjk0MTUsImV4cCI6MTYyNjE4MzgxNSwidHlwZSI6ImFjY2VzcyJ9.oSfXfzbGZFiQvF98vaGvjFIDYRfHPQjnE70RHJr6Xic' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "fake name"
}'