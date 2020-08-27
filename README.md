## Server API

### Get room info
  * GET `/rooms/:id`

**Path Parameters:**
  * `id` room id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "roomID": "Number",
      "description": "String",
      "starRating": "Number",
      "reviewTotal": "Number",
      "superhost": "Boolean",
      "location": "String",
      "images": [{
        "imageID": "Number",
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
      "starRating": "Number",
      "reviewTotal": "Number",
      "superhost": "Boolean",
      "location": "String",
      "images": [{
        "imageID": "Number",
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
      "starRating": "Number",
      "reviewTotal": "Number",
      "superhost": "Boolean",
      "location": "String",
      "images": [{
        "imageID": "Number",
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


### Add a photo to a room
  * POST `/rooms/:id/photos`

**Path Parameters:**
  * `id` room id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "imageURL": "String",
      "description": "String"
    }
```

### Update photo info of a room
  * PATCH `/rooms/:id/photos/:photo_id`

**Path Parameters:**
  * `id` room id
  * `photo_id` photo id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "imageURL": "String",
      "description": "String"
    }
```

### Delete photo of a room
  * DELETE `/rooms/:id/photos/:photo_id`

**Path Parameters:**
  * `id` room id
  * `photo_id` photo ids

**Success Status Code:** `204`