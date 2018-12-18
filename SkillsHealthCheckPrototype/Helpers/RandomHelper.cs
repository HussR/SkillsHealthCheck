using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using SkillsHealthCheckPrototype.Repository;
using SkillsHealthCheckPrototype.Models;

namespace SkillsHealthCheckPrototype.Helpers
{
    public static class RandomIdGenerator
    {
        private static char[] _base62chars =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            .ToCharArray();

        private static Random _random = new Random();

        public static string GetBase62(int length)
        {
            var sb = new StringBuilder(length);

            for (int i = 0; i < length; i++)
                sb.Append(_base62chars[_random.Next(62)]);

            return sb.ToString();
        }

        public static string GetBase36(int length)
        {
            var sb = new StringBuilder(length);

            for (int i = 0; i < length; i++)
                sb.Append(_base62chars[_random.Next(36)]);

            return sb.ToString();
        }

        public static string GetUniqueBase36(int length)
        {
            string randomId = GetBase36(length);
            var items = DocumentDBRepository<Customer>.GetCustomersAsync(d => d.CustomerRef == randomId);
            if(items.Result.Count() > 0)
            {
                GetUniqueBase36(length);
            }

            return randomId;
        }

    }
    
}
