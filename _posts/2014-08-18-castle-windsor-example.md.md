---
layout: post
title: Castle Windsor Example
tags: [castle, windsor, ioc, di, container]
---

Here is sample code demonstrating usage of Castle Dependency Injection Container in C#

    public interface ILogger
    {
        void Info(String message);
    }

    public interface INotifier
    {
        void Notify(String message);
    }

    public class ConsoleLogger : ILogger
    {
        public void Info(String message)
        {
            Console.Write(message);
        }
    }

    public class ConsoleNotifier : INotifier
    {
        public void Notify(String message)
        {
            Console.Write(message);
        }
    }

    public class Main
    {
        private ILogger logger;
        private INotifier notifier;

        public Main(ILogger logger, INotifier notifier)
        {
            this.logger = logger;
            this.notifier = notifier;
        }

        public void DoSomething()
        {
            logger.Info("Hello");
            notifier.Notify("World");
        }
    }

    public class RepositoriesInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Component.For<Main>());
            container.Register(Component.For<ILogger>().ImplementedBy<ConsoleLogger>());
            container.Register(Component.For<INotifier>().ImplementedBy<ConsoleNotifier>());
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var container = new WindsorContainer();
            container.Install(FromAssembly.This());

            var main = container.Resolve<Main>();
            main.DoSomething();
        }
    }

To make this work, do not forget to install castle by typing:

    Install-Package Castle.Windsor

Project site: http://docs.castleproject.org/Windsor.MainPage.ashx
