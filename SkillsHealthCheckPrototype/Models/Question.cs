using Microsoft.Azure.Documents;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace SkillsHealthCheckPrototype.Models
{
    public class Question
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }

        [JsonProperty(PropertyName = "questiontraits")]
        public List<QuestionTrait> Trait { get; set; }
        
        [JsonProperty(PropertyName = "isvisible")]
        public bool IsVisible { get; set; }

        [JsonProperty(PropertyName = "order")]
        public int Order { get; set; }

        [JsonProperty(PropertyName = "isflipquestion")]
        public bool? IsFlipQuestion { get; set; }
    }
}
