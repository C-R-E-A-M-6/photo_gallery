## Server API

### Get room info
  * GET `/rooms/:id/photogallery`

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

### Add a room
  * POST `/rooms`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "description": "String",
      "starRating": "Number",
      "reviewTotal": "Number",
      "superhost": "Boolean",
      "location": "String"
    }
```

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

### Update room info
  * PATCH `/rooms/:id`

**Path Parameters:**
  * `id` room id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "description": "String"
    }
```

### Update photo info
  * PATCH `/photos/:photo_id`

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

### Delete a room and all photos of that room
  * DELETE `/rooms/:id`

**Path Parameters:**
  * `id` room id

**Success Status Code:** `204`

### Delete a photo
  * DELETE `/photos/:photo_id`

**Path Parameters:**
  * `photo_id` photo id

**Success Status Code:** `204`