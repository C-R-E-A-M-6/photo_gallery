## Server API

### Get room info
  * GET `/rooms/:id`

**Path Parameters:**
  * `id` room id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "room_id": "Number",
      "description": "String",
      "starRating": "String",
      "reviewTotal": "String",
      "superhost": "String",
      "location": "Number",
      "images": [{
        "imageURL": "String",
        "description": "String"
      }]
    }
```

### Add room
  * POST `/rooms`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "description": "String",
      "starRating": "String",
      "reviewTotal": "String",
      "superhost": "String",
      "location": "Number",
      "images": [{
        "imageURL": "String",
        "description": "String"
      }]
    }
```

### Update room info
  * PATCH `/rooms/:id`

**Path Parameters:**
  * `id` room id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "description": "String",
      "starRating": "String",
      "reviewTotal": "String",
      "superhost": "String",
      "location": "Number",
      "images": [{
        "imageURL": "String",
        "description": "String"
      }]
    }
```

### Delete a room
  * DELETE `/rooms/:id`

**Path Parameters:**
  * `id` room id

**Success Status Code:** `204`