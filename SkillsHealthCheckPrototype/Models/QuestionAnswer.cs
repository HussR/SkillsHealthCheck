using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHealthCheckPrototype.Models
{
    public class QuestionAnswer
    {
        [JsonProperty(PropertyName = "questionid")]
        public string QuestionId { get; set; }

        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }

        [JsonProperty(PropertyName = "traitid")]
        public int TraitId { get; set; }

        [JsonProperty(PropertyName = "trait")]
        public string Trait { get; set; }

        [JsonProperty(PropertyName = "traitscore")]
        public int TraitScore { get; set; }
    }
}
