using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using Protractor;
using FluentAssertions;

namespace SkillsHealthCheckPrototype.Tests
{
    [TestFixture]
    public class BasicTests
    {
        const string URL = "http://localhost:2445/";

        IWebDriver driver;
        NgWebDriver ngDriver;

        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver("PATH-OF-CHROME-DRIVER");
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(20);
            ngDriver = new NgWebDriver(driver);
        }

        [Test]
        public void Basic_Homepage_ShouldHaveATitle()
        {
            ngDriver.Url = URL;
            var title = ngDriver.Title;
            title.Should().Be("SkillsHealthCheckPrototype");
        }

        [Test]
        public void GoThroughAssessment()
        {

            ngDriver.Url = URL + "assessment-neg";

            Random random = new Random();
            for (int i = 0; i < 40; i++)
            {
                int choice = random.Next(-2, 2);
                Console.WriteLine("Before click");
                ngDriver.WaitForAngular();
                ngDriver.FindElement(By.Id(choice.ToString())).Click();
                if(choice != 0)
                {
                    ngDriver.FindElement(By.Id("next")).Click();
                    Console.WriteLine("Next click");
                }
            }
            Console.WriteLine("URL: " + ngDriver.Url);
            ngDriver.Url.Should().Contain("outcome");
        }

        [TearDown]
        public void Teardown()
        {
            ngDriver.Quit();
        }
    }
}
