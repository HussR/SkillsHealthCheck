using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillsHealthCheckPrototype.Models;
using SkillsHealthCheckPrototype.Repository;

namespace SkillsHealthCheckPrototype.Controllers
{
    [Route("api/[controller]")]
    public class QuestionDataController : Controller
    {
        [AllowAnonymous]
        [HttpGet("[action]")]
        //Gets visible questions only
        public async Task<IEnumerable<Question>> GetQuestions()
        {
            var items = await DocumentDBRepository<Question>.GetQuestionsAsync(d => d.IsVisible);
            return items;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        //Gets visible questions only
        public async Task<Question> GetQuestionByOrder(int Order)
        {
            var items = await DocumentDBRepository<Question>.GetQuestionsAsync(d => d.IsVisible);
            //Not ideal but order not being passed through properly to predicate when put into GetQuestionsAsync
            return items.Where(q=>q.Order == Order).FirstOrDefault();
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<IEnumerable<Question>> GetAllQuestions()
        {
            var items = await DocumentDBRepository<Question>.GetAllQuestionsAsync();
            return items;
        }

#pragma warning disable 1998
        [ActionName("Create")]
        public async Task<IActionResult> CreateAsync()
        {
            return View();
        }
#pragma warning restore 1998

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            var items = await DocumentDBRepository<Customer>.GetCustomersAsync();
            return items;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<Customer> GetCustomerById(string id)
        {
            Customer item = await DocumentDBRepository<Customer>.GetCustomerAsync(id);
            return item;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<string> CreateCustomerAsync([FromBody]Customer customer)
        {
            //Insert datetime on start of survey
            customer.StartDateTime = DateTime.Now;
            if (ModelState.IsValid)
            {
                var doc = await DocumentDBRepository<Customer>.CreateCustomerAsync(customer);
                return doc.Id;
            }

            return null;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<bool> EditCustomerAsync([FromBody]Customer customer)
        {
            //Get datetime so empty value is not put into start.
            //This will not be needed when we move to sql.
            //Currently no patching support exists
            Customer cust = GetCustomerById(customer.Id).Result;
            customer.StartDateTime = cust.StartDateTime;
            //Put end time in constantly so last question should be finish time
            customer.EndDateTime = DateTime.Now;
            if (ModelState.IsValid)
            {
                await DocumentDBRepository<Customer>.UpdateCustomerAsync(customer.Id, customer);
                return true;
            }

            return false;
        }

        [ActionName("Edit")]
        public async Task<ActionResult> EditAsync(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            Question item = await DocumentDBRepository<Question>.GetQuestionAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            return View(item);
        }

        [ActionName("Delete")]
        public async Task<ActionResult> DeleteAsync(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            Question item = await DocumentDBRepository<Question>.GetQuestionAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            return View(item);
        }

        [HttpPost]
        [ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmedAsync([Bind("Id")] string id)
        {
            await DocumentDBRepository<Question>.DeleteQuestionAsync(id);
            return RedirectToAction("Index");
        }

        [ActionName("Details")]
        public async Task<ActionResult> DetailsAsync(string id)
        {
            Question item = await DocumentDBRepository<Question>.GetQuestionAsync(id);
            return View(item);
        }

        private async Task<String> getRawPostData()
        {
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                return await reader.ReadToEndAsync();
            }
        }
    }
}
