# [express-meta-data](https://github.com/deployable/node-deployable-express-meta-data)

Express Meta Data

### Install
 
    npm install deployable-express-meta-data --save

    yarn add deployable-express-meta-data

### Usage

```javascript

const emd = require('deployable-express-meta-data')
const app = require('express')()

// Conn and Requst Tracking
app.use( ExpressMetaData.singleton.genMiddleware() )
app.get('/', (req,res) => res.json(req._emd.request_id))

```

### License

deployable-express-meta-data is released under the MIT license.

Copyright 2016 Matt Hoyle - code at deployable.co

https://github.com/deployable/deployable-express-meta-data

