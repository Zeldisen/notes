[Insomnia_2025-11-26.yaml](https://github.com/user-attachments/files/23773614/Insomnia_2025-11-26.yaml)
type: collection.insomnia.rest/5.0
name: notes
meta:
  id: wrk_24f2fe43eadc486c804a4b03d06ef2ff
  created: 1764151592654
  modified: 1764151592654
  description: ""
collection:
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/auth/signup
    name: signup
    meta:
      id: req_589e0a2681984e2a8a848e2d4ba2b591
      created: 1763979929916
      modified: 1764161223530
      isPrivate: false
      description: ""
      sortKey: -1763979929916
    method: POST
    body:
      mimeType: application/json
      text: |-
        {"username": "jane",
        	"password": "jane1234",
        	"firstname": "jane",
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
      id: req_5d52c98740be486485ba3fdd56a79cf6
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
      id: req_d2d838bd3de94f3f856e4ae0bbdc1b34
      created: 1763985693261
      modified: 1764160251190
      isPrivate: false
      description: ""
      sortKey: -1763985693261
    method: POST
    body:
      mimeType: application/json
      text: |
        {
          "title": "träna",
        	"content": "måndag, onsdag, fredag"
         
        }
    headers:
      - name: Content-Type
        value: application/json
      - name: User-Agent
        value: insomnia/11.6.2
    authentication:
      type: bearer
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjcjdkQnlOUG1rZ3o5azVHeldfY1MiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDE2MDAzOSwiZXhwIjoxNzY0MTYxODM5fQ.1cWT40NAoxUuKqSpdCDcPaIhT-fCH5ORNxKS-sLHGBw
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
      id: req_75abafd7a2524e1d92912f8a7768202f
      created: 1763993464825
      modified: 1764160070245
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
      disabled: false
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjcjdkQnlOUG1rZ3o5azVHeldfY1MiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDE2MDAzOSwiZXhwIjoxNzY0MTYxODM5fQ.1cWT40NAoxUuKqSpdCDcPaIhT-fCH5ORNxKS-sLHGBw
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/notes/15ada71e-90cc-43f1-960a-2513c44bcd14
    name: editNote
    meta:
      id: req_644eb0e4cac44a7bb93a74c4643c18fc
      created: 1764069926974
      modified: 1764160198482
      isPrivate: false
      description: ""
      sortKey: -1764069926974
    method: PATCH
    body:
      mimeType: application/json
      text: |-
        {
        	 
        "title": "onsdag",
        	"content" : "fika med vänner"
        }
    headers:
      - name: Content-Type
        value: application/json
      - name: User-Agent
        value: insomnia/11.6.2
    authentication:
      type: bearer
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjcjdkQnlOUG1rZ3o5azVHeldfY1MiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDE2MDAzOSwiZXhwIjoxNzY0MTYxODM5fQ.1cWT40NAoxUuKqSpdCDcPaIhT-fCH5ORNxKS-sLHGBw
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/notes/ab2aaa3b-e879-47da-ba92-847ad3597e46
    name: deleteNote
    meta:
      id: req_3e7844ea69a04d0e8f730e29d07a4be8
      created: 1764073400218
      modified: 1764160303359
      isPrivate: false
      description: ""
      sortKey: -1764073400218
    method: DELETE
    headers:
      - name: User-Agent
        value: insomnia/11.6.2
    authentication:
      type: bearer
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjcjdkQnlOUG1rZ3o5azVHeldfY1MiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDE2MDAzOSwiZXhwIjoxNzY0MTYxODM5fQ.1cWT40NAoxUuKqSpdCDcPaIhT-fCH5ORNxKS-sLHGBw
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/notes/ab2aaa3b-e879-47da-ba92-847ad3597e46/restore
    name: restoreNote
    meta:
      id: req_a1bb4d0383f14422b3042d2b09534318
      created: 1764073893398
      modified: 1764160378894
      isPrivate: false
      description: ""
      sortKey: -1764073893398
    method: PUT
    headers:
      - name: User-Agent
        value: insomnia/11.6.2
    authentication:
      type: bearer
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjcjdkQnlOUG1rZ3o5azVHeldfY1MiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDE2MDAzOSwiZXhwIjoxNzY0MTYxODM5fQ.1cWT40NAoxUuKqSpdCDcPaIhT-fCH5ORNxKS-sLHGBw
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/notes/by-date?date=2025-11-26
    name: getNoteByDate
    meta:
      id: req_ebe643ec373e4b1eaaadb6a1db6b31be
      created: 1764152812538
      modified: 1764160449135
      isPrivate: false
      description: ""
      sortKey: -1764152812538
    method: GET
    headers:
      - name: User-Agent
        value: insomnia/11.6.2
    authentication:
      type: bearer
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjcjdkQnlOUG1rZ3o5azVHeldfY1MiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDE2MDAzOSwiZXhwIjoxNzY0MTYxODM5fQ.1cWT40NAoxUuKqSpdCDcPaIhT-fCH5ORNxKS-sLHGBw
    settings:
      renderRequestBody: true
      encodeUrl: true
      followRedirects: global
      cookies:
        send: true
        store: true
      rebuildPath: true
  - url: https://2twii6puo2.execute-api.eu-north-1.amazonaws.com/notes/deleted
    name: getDeletedNotes
    meta:
      id: req_c8cf2ca464d345bdb7649bf9e4c3d7fe
      created: 1764155344399
      modified: 1764160341330
      isPrivate: false
      description: ""
      sortKey: -1764155344399
    method: GET
    headers:
      - name: User-Agent
        value: insomnia/11.6.2
    authentication:
      type: bearer
      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjcjdkQnlOUG1rZ3o5azVHeldfY1MiLCJ1c2VybmFtZSI6Imphc21pbiIsImlhdCI6MTc2NDE2MDAzOSwiZXhwIjoxNzY0MTYxODM5fQ.1cWT40NAoxUuKqSpdCDcPaIhT-fCH5ORNxKS-sLHGBw
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
    id: jar_ac8923dd4a31489ca6ae92cc935b810b
    created: 1763979923680
    modified: 1763979923680
environments:
  name: Base Environment
  meta:
    id: env_3d7c336399d04f6f8088ff134e4c39d3
    created: 1763979923677
    modified: 1763979923677
    isPrivate: false
