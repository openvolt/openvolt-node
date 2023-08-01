# Openvolt Node.js Library

The Openvolt Node library is a light wrapper around the the Openvolt API

## Documentation

See the Openvolt [API docs](https://docs.openvolt.com) for detailed information on the REST API.

## Requirements

Node 12 or higher

## Installation

Install the package with:

```
npm install openvolt
```

## Recipe

The following is an example of how a developer would integrate the Openvolt node library.  
Note, the package needs to be configured using your account's `api_key` which is available
in the [Openvolt Dashboard](https://dashboard.openvolt.com)

A user would typically follow these steps to pull electricity data from a meter

1. Create a customer
2. Create a meter with associated MPAN
3. Create a consent object that proves the user has permission to access this MPAN for the type of data and dates. This includes uploading documented evidence showing consent is given
4. Attach this consent to the Meter (the same consent can cover many meters, say for an asset manager owning many buildings)
5. Pull the electricity data
6. Once the user is satisfied that everything is working, they can configure the `meter` to schedule data pulls on specific intervals and send the data to `webhook` endpoints configured in the [Openvolt Dashboard](https://dashboard.openvolt.com)

```javascript
const openvolt = require('openvolt')('test-K00400......');

// Create a customer
const customer = await openvolt.customers.create({
  name: 'Stark Industries',
  email: 'tony@stark.io',
});

// Create the meter
const meter = await openvolt.meters.create({
  customer_id: customer._id,
  mpan: '1200....',
  name: 'tony-downstairs-lab',
});

//Create the consent object with the associated permissions and dates
let consent = await openvolt.consents.create({
  customer_id: customer._id,
  mpans: ['1200....'],
  type: 'reading|interval',
  start_date: '2018-01-01',
  end_date: '2023-01-01',
});

// Upload the evidence file and attach it to the consent object
let binary_data = fs.readFileSync('/path/to/a/file.jpg');
let file = openvolt.files.create({
  file: {
    data: binary_data,
    name: 'file.jpg',
    content_type: 'application.octet-stream',
  },
  purpose: 'letter_of_authority',
});

consent = await openvolt.consents.update(consent._id, { evidence: file._id });

//Attach the consent to the meter
await openvolt.meters.update(meter._id, { consent: consent._id });

//Pull meter information
let intervals = await openvolt.intervals.list({
  customer_id: customer._id,
  mpan: '1200....',
  start_date: '2018-01-01',
  end_date: '2018-01-10',
  granularity: 'half_hour',
});
```
