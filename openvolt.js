const axios = require('axios');

module.exports = function (apiKey) {
  const baseURL = 'http://localhost:1024/v1';
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['x-api-key'] = apiKey;

  return {
    /**
        == Customers ==
        customers: <public api> These are the customers of Openvolt accounts. An 
        account that is building an energy app for the flexibility markets will have 
        many different customers who will have access to many meters. It will be up 
        to our users to manage these customers in whatever structure they choose. 
        For example, our users may want to group customers or meters into contstructs 
        that make sense for their businesses (asset portfolio for carbon reporting 
        for example) but we will not provide this hierarchy for them (we may wish 
        to make provisions for meta_data fields but this is tbd)
    */
    customers: {
      create: async function (data) {
        try {
          const response = await axios.post('/customers', data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      retrieve: async function (id) {
        try {
          const response = await axios.get(`/customers/${id}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      update: async function (id, data) {
        try {
          const response = await axios.put(`/customers/${id}`, data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      delete: async function (id) {
        try {
          const response = await axios.delete(`/customers/${id}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      },

      list: async function (data) {
        try {
          const response = await axios.get('/customers', { params: data });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    },

    /**
        == Meters == 
        meters: <public api> This is the physical device that measures the consumption 
        or generation of electricity. Each meter must have an {{MPAN}} as this is what 
        we need to extract data from central resources. It is possible that there will 
        be many meters with the same mpans in the Openvolt platform as many customers 
        may have permissions for the same meter. This doesn't matter to Openvolt once 
        they have the right consent in place to pull data for this meter. 
    */
    meters: {
      create: async function (data) {
        try {
          const response = await axios.post('/meters', data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      retrieve: async function (id) {
        try {
          const response = await axios.get(`/meters/${id}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      update: async function (id, data) {
        try {
          const response = await axios.put(`/meters/${id}`, data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      delete: async function (id) {
        try {
          const response = await axios.delete(`/meters/${id}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      list: async function (data) {
        try {
          const response = await axios.get('/meters', { params: data });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    },
    // Files
    // We will need the user to create a Buffer for handling binary data
    // https://nodejs.org/api/buffer.html
    files: {
      create: async function (data) {
        try {
          const response = await axios.post('/files', data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    },
    /**
        == Consents ==
        consents: <public api> An account will need documented evidence they have 
        the correct authority to access the data of a specific mpan. It's still TBD
        the level Openvolt will need to go to, to assure the correctness of this 
        evidence, or just provide the right tools to allow accounts ensure they have
        this correct evidence in place. Ultimlately, this evidence will be in the form
        of some form of file, be that a jpeg photo of a letter of authority, a pdf of
        a customer bill or even a voice recording of a customer giving an account 
        the correct consent.
    */
    consents: {
      create: async function (data) {
        try {
          const response = await axios.post('/consents', data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      retrieve: async function (id) {
        try {
          const response = await axios.get(`/consents/${id}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      update: async function (id, data) {
        try {
          const response = await axios.put(`/consents/${id}`, data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      delete: async function (id) {
        try {
          const response = await axios.delete(`/consents/${id}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      list: async function (data) {
        try {
          const response = await axios.get('/consents', { params: data });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    },
    /**
        == Readings ==
        readings: <public api> These will be actual readings from meters at a specific
        start_date and end_date
    */
    readings: {
      list: async function (data) {
        try {
          const response = await axios.get('/readings', { params: data });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    },
    /**
	== Intervals ==
	intervals: <public api> Time series data giving actual consumption values
	depending on the granularity requested. If the granularity requested is less 
	than what is available in the source data, then an error will be thrown. If
	the granularity is larger than the source data then Openvolt will aggregate
	the data (weekly|monthly etc)
*/
    intervals: {
      list: async function (data) {
        try {
          const response = await axios.get('/intervals', { params: data });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    },
  };
};
