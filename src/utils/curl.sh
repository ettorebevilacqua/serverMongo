curl -X 'POST' \
  'http://vps-cbd3edb5.vps.ovh.net/v1/moduli' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGViMWIwN2Q2NzQ1ODY4NzA3ZGU1YTMiLCJpYXQiOjE2MjYxNjk0MTUsImV4cCI6MTYyNjE4MzgxNSwidHlwZSI6ImFjY2VzcyJ9.oSfXfzbGZFiQvF98vaGvjFIDYRfHPQjnE70RHJr6Xic' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "fake name"
}'
curl -X 'POST' \
  'http://vps-cbd3edb5.vps.ovh.net/v1/lists' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWQ1OWZiNzdlYzcwYWYyM2NjMzE3MzMiLCJpYXQiOjE2NDEzOTU1NzMsImV4cCI6MTY0MTUzOTU3MywidHlwZSI6ImFjY2VzcyJ9.fzOQ0okUBGGE0aGiyjUDURrKMsBYFqmCb4eOVFns0e0' \
  -H 'Content-Type: application/json' \
  -d '{
      "name": "personaleTipo",
      "list": [
        {
          "label": "docente"
        },
        {
          "label": "tutor"
        },
        {
          "label": "Coordinatore"
        },
        {
          "label": "Analista del fabbisogno"
        },
        {
          "label": "Esperto di competenze"
        },
        {
          "label": "Operatore del mercato del lavoro"
        }
      ]
    }'


curl -X 'POST' \
  'http://vps-cbd3edb5.vps.ovh.net/v1/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "ettore@bevilacqua.com",
  "password": "password1"
}'


user":{"role":"admin","isEmailVerified":false,"name":"ettorebevilacqua","email":"ettore@bevilacqua.com","id":"61d59fb77ec70af23cc31733"},"tokens":{"access":
{"token":
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWQ1OWZiNzdlYzcwYWYyM2NjMzE3MzMiLCJpYXQiOjE2NDEzOTU1NzMsImV4cCI6MTY0MTUzOTU3MywidHlwZSI6ImFjY2VzcyJ9.fzOQ0okUBGGE0aGiyjUDURrKMsBYFqmCb4eOVFns0e0","expires":"2022-01-07T07:12:53.115Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWQ1OWZiNzdlYzcwYWYyM2NjMzE3MzMiLCJpYXQiOjE2NDEzOTU1NzMsImV4cCI6MTY0Mzk4NzU3MywidHlwZSI6InJlZnJlc2gifQ.x28cu9NSk-Yn-AAZQbvO4l1laiVdGuSNIoq_JIGcuGU","expires":"2022-02-04T15:1