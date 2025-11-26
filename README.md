# Mina anteckningar
[Insomnia_2025-11-26.yaml](https://github.com/user-attachments/files/23767444/Insomnia_2025-11-26.yaml)
type: collection.insomnia.rest/5.0
name: notes
meta:
  id: wrk_584ea5714bd74347897d9a8089bf13b3
  created: 1763979923675
  modified: 1763979923675
  description: ""
collection:
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/auth/signup
    name: signup
    meta:
      id: req_d03f539f0e9242a4b3bafdcf01307af6
      created: 1763979929916
      modified: 1764067430333
      isPrivate: false
      description: ""
      sortKey: -1763979929916
    method: POST
    body:
      mimeType: application/json
      text: |-
        {"username": "jasmin",
        	"password": "jasmine1234",
        	"firstname": "jasmine",
        	"lastname": "smith"}
    headers:
      - name: Content-Type
        value: application/json
      - name: User-Agent
        value: insomnia/11.6.2
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/auth/signin
    name: signin
    meta:
      id: req_146040d909504246a7d450ef5077d471
      created: 1763982413568
      modified: 1764067470137
      isPrivate: false
      description: ""
      sortKey: -1763982413568
    method: POST
    body:
      mimeType: application/json
      text: |-
        {
        	"username": "jasmin",
        	"password": "jasmine1234"
        }
    headers:
      - name: Content-Type
        value: application/json
      - name: User-Agent
        value: insomnia/11.6.2
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/createNote
    name: createNote
    meta:
      id: req_07ef87067806400e9e5fc24bcc5173ca
      created: 1763985693261
      modified: 1764079595586
      isPrivate: false
      description: ""
      sortKey: -1763985693261
    method: POST
    body:
      mimeType: application/json
      text: |
        {
          "title": "städning",
        	"content": "dadjaklkdjaldja"
         
        }
    headers:
      - name: Content-Type
        value: application/json
      - name: User-Agent
        value: insomnia/11.6.2
    authentication:
      type: bearer
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJWWExlRzVqR2xiRGpZcDBTUkZPMmIiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDA3OTUzNSwiZXhwIjoxNzY0MDgxMzM1fQ.7xkIjvL9CSZROxqlSFSktIqFunhQ93RFbt8LKRsc_7k
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/getNote
    name: getNote
    meta:
      id: req_a2f865630bf54c48b38b2cde075ca792
      created: 1763993464825
      modified: 1764079611730
      isPrivate: false
      description: ""
      sortKey: -1763993464825
    method: GET
    body:
      mimeType: application/json
      text: ""
    headers:
      - name: Content-Type
        value: application/json
      - name: User-Agent
        value: insomnia/11.6.2
    authentication:
      type: bearer
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJWWExlRzVqR2xiRGpZcDBTUkZPMmIiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDA3OTUzNSwiZXhwIjoxNzY0MDgxMzM1fQ.7xkIjvL9CSZROxqlSFSktIqFunhQ93RFbt8LKRsc_7k
      disabled: false
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/notes/09342b05-db90-481f-8afd-7a8fc9304bd2
    name: editNote
    meta:
      id: req_458a355101834d78905ad81c708efdd7
      created: 1764069926974
      modified: 1764079699220
      isPrivate: false
      description: ""
      sortKey: -1764069926974
    method: PATCH
    body:
      mimeType: application/json
      text: |-
        {
        	 
        "title": "onsdag",
        	"content" : "löpträning"
        }
    headers:
      - name: Content-Type
        value: application/json
      - name: User-Agent
        value: insomnia/11.6.2
    authentication:
      type: bearer
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJWWExlRzVqR2xiRGpZcDBTUkZPMmIiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDA3OTUzNSwiZXhwIjoxNzY0MDgxMzM1fQ.7xkIjvL9CSZROxqlSFSktIqFunhQ93RFbt8LKRsc_7k
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/notes/5415d08a-eb22-49dd-96e6-0de6e12a23a5
    name: deleteNote
    meta:
      id: req_a1673295fc9d482987be8198b9e489f5
      created: 1764073400218
      modified: 1764079929566
      isPrivate: false
      description: ""
      sortKey: -1764073400218
    method: DELETE
    headers:
      - name: User-Agent
        value: insomnia/11.6.2
    authentication:
      type: bearer
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJWWExlRzVqR2xiRGpZcDBTUkZPMmIiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDA3OTUzNSwiZXhwIjoxNzY0MDgxMzM1fQ.7xkIjvL9CSZROxqlSFSktIqFunhQ93RFbt8LKRsc_7k
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/notes/8302a49b-9f13-4c07-9650-33fc0effac20/restore
    name: restoreNote
    meta:
      id: req_90329aa5f2fc417f9036d077bb26b287
      created: 1764073893398
      modified: 1764079834380
      isPrivate: false
      description: ""
      sortKey: -1764073893398
    method: PUT
    headers:
      - name: User-Agent
        value: insomnia/11.6.2
    authentication:
      type: bearer
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJWWExlRzVqR2xiRGpZcDBTUkZPMmIiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDA3OTUzNSwiZXhwIjoxNzY0MDgxMzM1fQ.7xkIjvL9CSZROxqlSFSktIqFunhQ93RFbt8LKRsc_7k
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
cookieJar:
  name: Default Jar
  meta:
    id: jar_c745db356ecf21cea0a47719ef96ae315d6e08d4
    created: 1763979923680
    modified: 1763979923680
environments:
  name: Base Environment
  meta:
    id: env_c745db356ecf21cea0a47719ef96ae315d6e08d4
    created: 1763979923677
    modified: 1763979923677
    isPrivate: false
