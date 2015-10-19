# rave-router
This router routes like a rave!


Write routes like this:
```
[
    {
      "name": "test",
      "path": "resp",
      "socket": true,
      "routes": {
        "GET /": "get",
        "POST /": "handle",
        "DELETE /" "delete"
        "GET /test/:id", "get_id"
      }
    },
    {
      "name": "test2",
      "path": "resp2",
      "socket": false,
      "routes": {
        "GET /": "get"
      }
    }
]
```

<img src="http://www.vipbacking.eu/midicovers/CR2169.jpg" alt="Klaus Wunderlich">