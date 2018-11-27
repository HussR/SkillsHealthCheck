using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHealthCheckPrototype.Models
{
    public class Customer
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "questionanswers")]
        public List<QuestionAnswer> QuestionAnswers { get; set; }

        [JsonProperty(PropertyName = "startdatetime")]
        public DateTime StartDateTime { get; set; }

        [JsonProperty(PropertyName = "enddatetime")]
        public DateTime EndDateTime { get; set; }
    }
}
