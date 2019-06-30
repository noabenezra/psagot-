using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pasgotApi.Models
{
    public class seriesDetails
    {
        public string Title {get;set;}
        public int Seasons { get; set; }
        public long Views { get; set; }
        public string Img { get; set; }
        public string Details { get; set; }

    }
}