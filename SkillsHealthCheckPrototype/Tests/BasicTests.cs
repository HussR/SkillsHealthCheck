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
            driver = new ChromeDriver("C:\\Users\\husse\\source\\repos\\SkillsHealthCheckPrototype\\SkillsHealthCheckPrototype");
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

            ngDriver.Url = URL + "assessment";

            Random random = new Random();
            for (int i = 0; i < 40; i++)
            {
                int choice = random.Next(0, 4);

                if (choice == 4)
                {
                    ngDriver.FindElement(By.Id("super-happy")).Click();
                }
                else if (choice == 3)
                {
                    ngDriver.FindElement(By.Id("happy")).Click();
                }
                else if (choice == 2)
                {
                    ngDriver.FindElement(By.Id("neutral")).Click();
                }
                else if (choice == 1)
                {
                    ngDriver.FindElement(By.Id("sad")).Click();
                }
                else if (choice == 0)
                {
                    ngDriver.FindElement(By.Id("super-sad")).Click();
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
