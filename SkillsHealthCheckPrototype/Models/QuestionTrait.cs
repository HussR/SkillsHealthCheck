using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHealthCheckPrototype.Models
{
    public class QuestionTrait
    {
        [JsonProperty(PropertyName = "traitid")]
        public int TraitId { get; set; }

        [JsonProperty(PropertyName = "trait")]
        public string Trait { get; set; }
    }
}
