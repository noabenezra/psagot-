using Newtonsoft.Json;
using pasgotApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pasgotApi.Controllers
{

    public class ValuesController : ApiController
    {
        // GET api/values
        public List<seriesDetails> Get()
        {
            List<seriesDetails> items = null;
            using (StreamReader r = new StreamReader((@"C:/Users/Noa ben ezra/source/repos/pasgotApi/pasgotApi/Models/series.json")))
            {
                string json = r.ReadToEnd();
                 items = JsonConvert.DeserializeObject<List<seriesDetails>>(json);
            }
            return items;
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
