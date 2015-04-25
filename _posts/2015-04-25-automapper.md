---
layout: post
title: Automapper example
tags: [c#, automapper, map]
---

Everyday task - retrieve data from SQL and map it to object can be achived in nice and elegant way with [Automapper](http://automapper.org/)

Automapper usage example
------------------------

    using System;
    using System.Globalization;
    using System.Linq;
    using AutoMapper;

    namespace AutomapperExample
    {
        // Source class retrieved from somewhere e.g. sql query
        class PersonDto
        {
            public string FullName { get; set; } // should be splitted into first name and last name
            public string Skills { get; set; } // comma separated list
            public string BirthDate { get; set; } // should be casted to date time, inputs will be something like: 1985-03-11
            public int Sex { get; set; } // 1 or 2 should be resolved to proper enum, can be null
        }

        // Destination class to which we want map our source class
        class Person
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }

            public string[] Skills { get; set; }

            public DateTime? BirthDate { get; set; }

            public Sex Sex { get; set; }

            public string FullName
            {
                get { return string.Format("{0} {1}", FirstName, LastName); }
            }

            public int Age
            {
                get { return BirthDate.HasValue ? DateTime.Now.Year - BirthDate.Value.Year : 0; }
            }
        }

        enum Sex
        {
            Undefined = 0,
            Male = 1,
            Female = 2
        }

        #region Resolvers
        class CommaSeparatedListResolver : ValueResolver<string, string[]>
        {
            protected override string[] ResolveCore(string source)
            {
                return (source ?? "").Split(',').Select(item => item.Trim()).Where(item => !string.IsNullOrEmpty(item)).OrderBy(item => item).Distinct().ToArray();
            }
        }

        class SexResolver : ValueResolver<int, Sex>
        {
            protected override Sex ResolveCore(int source)
            {
                switch (source)
                {
                    case 1: return Sex.Male;
                    case 2: return Sex.Female;
                    default: return Sex.Undefined;
                }
            }
        }

        class DateResolver : ValueResolver<string, DateTime?>
        {
            protected override DateTime? ResolveCore(string source)
            {
                try
                {
                    return DateTime.ParseExact(source, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                }
                catch (ArgumentNullException ex)
                {
                    return null;
                }
                catch (FormatException ex)
                {
                    return null;
                }
            }
        }
        #endregion

        class Program
        {
            static void Main(string[] args)
            {
                Mapper.CreateMap<PersonDto, Person>()
                    // Inline mappings
                    .ForMember(destination => destination.FirstName, member => member.MapFrom(source => source.FullName.Split(' ').FirstOrDefault()))
                    .ForMember(destination => destination.LastName, member => member.MapFrom(source => source.FullName.Split(' ').LastOrDefault()))
                    // Custom resolvers
                    .ForMember(destination => destination.Skills, member => member.ResolveUsing<CommaSeparatedListResolver>().FromMember(source => source.Skills))
                    .ForMember(destination => destination.BirthDate, member => member.ResolveUsing<DateResolver>().FromMember(source => source.BirthDate))
                    .ForMember(destination => destination.Sex, member => member.ResolveUsing<SexResolver>().FromMember(source => source.Sex));

                var row = new PersonDto
                {
                    FullName = "Alexandr Marchenko",
                    Skills = " php, js,c#,,js ",
                    //Sex = 1
                };

                var person = Mapper.Map<Person>(row);

                Console.WriteLine("FirstName: {0}", person.FirstName); // Alexandr
                Console.WriteLine("FirstName: {0}", person.LastName); // Marchenko
                Console.WriteLine("FullName: {0}", person.FullName); // Alexandr Marchenko
                Console.WriteLine("Skills: {0}", string.Join(", ", person.Skills)); // "c#, js, php"
                Console.WriteLine("BirthDate: {0}", person.BirthDate.HasValue ? person.BirthDate.Value.ToShortDateString() : "NULL"); // NULL
                Console.WriteLine("Age: {0}", person.Age); // 0
                Console.WriteLine("Sex: {0}", person.Sex); // Undefined
                Console.ReadKey();
            }
        }
    }
