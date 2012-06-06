using System.Collections.Generic;

namespace CodeCamper.Data.SampleData
{
    public static class PeopleNames
    {
        public enum NameGender
        {
            Male,
            Female,
            Both,
        }

        public class Name
        {
            public Name()
            {
                Gender = "M"; // generated techie person is probably male
            }
            public string First { get; set; }
            public string Last { get; set; }
            public string Gender { get; set; }
        }

        public static IEnumerable<Name> GetRandomNames(int count, NameGender nameGender = NameGender.Both)
        {
            var enumerator = RandomNameEnumerator(nameGender);
            while (count-- > 0)
            {
                enumerator.MoveNext();
                yield return enumerator.Current;
            }
        }

        // ReSharper disable FunctionNeverReturns
        // These are enumerators that keep yielding values as long as you ask for them
        // They never stop returning names; a caller pulls the number of names that it needs.

        public static IEnumerator<Name> RandomNameEnumerator(NameGender nameGender = NameGender.Both)
        {
            // If NameGender.Both, alternate between male and female names
            var isMaleA = nameGender == NameGender.Both || nameGender == NameGender.Male;
            var isMaleB = nameGender == NameGender.Male;

            var genderA = isMaleA ? "M" : "F";
            var firstNameEnumeratorA = 
                RandomFirstNameEnumerator((isMaleA) ? NameGender.Male : NameGender.Female);

            var genderB = isMaleB ? "M" : "F";
            var firstNameEnumeratorB =
                RandomFirstNameEnumerator((isMaleB) ? NameGender.Male : NameGender.Female);

            var lastNameEnumerator = RandomLastNameEnumerator();

            while (true)
            {
                firstNameEnumeratorA.MoveNext();
                lastNameEnumerator.MoveNext();
                yield return new Name
                    {
                        First = firstNameEnumeratorA.Current, 
                        Last = lastNameEnumerator.Current,
                        Gender = genderA,
                    };

                firstNameEnumeratorB.MoveNext();
                lastNameEnumerator.MoveNext();
                yield return new Name
                    {
                        First = firstNameEnumeratorB.Current,
                        Last = lastNameEnumerator.Current,
                        Gender = genderB,
                    };
            }

        }

        public static IEnumerable<string> GetRandomLastNames(int count)
        {
            var enumerator = RandomLastNameEnumerator();
            while (count-- > 0)
            {
                enumerator.MoveNext();
                yield return enumerator.Current;
            }
        }

        public static IEnumerator<string> RandomLastNameEnumerator()
        {
            var max = Surnames.Length;
            var rand = new System.Random();

            while (true)
            {
                yield return Surnames[rand.Next(0, max)];
            }
        }

        public static IEnumerable<string> GetRandomFirstNames(int count, NameGender nameGender = NameGender.Both)
        {
            var enumerator = RandomFirstNameEnumerator(nameGender);
            while (count-- > 0)
            {
                enumerator.MoveNext();
                yield return enumerator.Current;
            }
        }

        public static IEnumerator<string> RandomFirstNameEnumerator(NameGender nameGender = NameGender.Both)
        {
            var maleMax = MaleFirstNames.Length;
            var femaleMax = FemaleFirstNames.Length;
            var rand = new System.Random();

            while (true)
            {
                if (nameGender == NameGender.Male || nameGender == NameGender.Both )
                    yield return MaleFirstNames[rand.Next(0, maleMax)];

                if (nameGender == NameGender.Female || nameGender == NameGender.Both)
                    yield return FemaleFirstNames[rand.Next(0, femaleMax)];
            } 
        }
        // ReSharper restore FunctionNeverReturns

        public static string[] FemaleFirstNames = new[] 
        {                                            
            "Isabella",
            "Sophia",
            "Emma",
            "Olivia",
            "Colleen",
            "Emily",
            "Abigail",
            "Madison",
            "Chloe",
            "Mia",
            "Addison",
            "Elizabeth",
            "Ella",
            "Natalie",
            "Samantha",
            "Alexis",
            "Lily",
            "Grace",
            "Hailey",
            "Alyssa",
            "Lillian",
            "Hannah",
            "Avery",
            "Leah",
            "Nevaeh",
            "Sofia",
            "Ashley",
            "Anna",
            "Brianna",
            "Sarah",
            "Zoe",
            "Victoria",
            "Gabriella",
            "Brooklyn",
            "Kaylee",
            "Taylor",
            "Layla",
            "Allison",
            "Evelyn",
            "Riley",
            "Amelia",
            "Khloe",
            "Makayla",
            "Aubrey",
            "Charlotte",
            "Savannah",
            "Zoey",
            "Bella",
            "Kayla",
            "Alexa",
            "Peyton",
            "Audrey",
            "Claire",
            "Arianna",
            "Julia",
            "Haley",
            "Kylie",
            "Lauren",
            "Sophie",
            "Sydney",
            "Camila",
            "Jasmine",
            "Morgan",
            "Alexandra",
            "Jocelyn",
            "Gianna",
            "Maya",
            "Kimberly",
            "Mackenzie",
            "Katherine",
            "Destiny",
            "Brooke",
            "Trinity",
            "Faith",
            "Lucy",
            "Madelyn",
            "Madeline",
            "Bailey",
            "Payton",
            "Andrea",
            "Autumn",
            "Melanie",
            "Ariana",
            "Serenity",
            "Stella",
            "Maria",
            "Molly",
            "Caroline",
            "Genesis",
            "Kaitlyn",
            "Eva",
            "Jessica",
            "Angelina",
            "Valeria",
            "Gabrielle",
            "Naomi",
            "Mariah",
            "Natalia",
            "Paige"
        };

        public static string[] MaleFirstNames = new[] 
        { 
            "Jacob",
            "Ethan",
            "Michael",
            "Jayden",
            "William",
            "Alexander",
            "Noah",
            "Daniel",
            "Aiden",
            "Anthony",
            "Joshua",
            "Mason",
            "Christopher",
            "Andrew",
            "David",
            "Matthew",
            "Logan",
            "Elijah",
            "James",
            "Joseph",
            "Gabriel",
            "Benjamin",
            "Ryan",
            "Samuel",
            "Jackson",
            "John",
            "Nathan",
            "Jonathan",
            "Christian",
            "Liam",
            "Dylan",
            "Landon",
            "Caleb",
            "Tyler",
            "Lucas",
            "Evan",
            "Gavin",
            "Nicholas",
            "Isaac",
            "Brayden",
            "Luke",
            "Angel",
            "Brandon",
            "Jack",
            "Isaiah",
            "Jordan",
            "Owen",
            "Carter",
            "Connor",
            "Justin",
            "Jose",
            "Jeremiah",
            "Julian",
            "Robert",
            "Aaron",
            "Adrian",
            "Wyatt",
            "Kevin",
            "Hunter",
            "Cameron",
            "Zachary",
            "Thomas",
            "Charles",
            "Austin",
            "Eli",
            "Chase",
            "Henry",
            "Sebastian",
            "Jason",
            "Levi",
            "Xavier",
            "Ian",
            "Colton",
            "Dominic",
            "Juan",
            "Cooper",
            "Josiah",
            "Luis",
            "Ayden",
            "Carson",
            "Adam",
            "Nathaniel",
            "Brody",
            "Tristan",
            "Diego",
            "Parker",
            "Blake",
            "Oliver",
            "Cole",
            "Carlos",
            "Jaden",
            "Jesus",
            "Alex",
            "Aidan",
            "Eric",
            "Hayden",
            "Bryan",
            "Max",
            "Jaxon",
            "Brian"
        };

        public static string[] Surnames = new[]
        {
            "Smith",
            "Johnson",
            "Williams",
            "Jones",
            "Brown",
            "Davis",
            "Miller",
            "Wilson",
            "Moore",
            "Taylor",
            "Anderson",
            "Thomas",
            "Jackson",
            "White",
            "Harris",
            "Martin",
            "Thompson",
            "Garcia",
            "Martinez",
            "Robinson",
            "Clark",
            "Rodriguez",
            "Lewis",
            "Lee",
            "Walker",
            "Hall",
            "Allen",
            "Young",
            "Hernandez",
            "King",
            "Wright",
            "Lopez",
            "Hill",
            "Scott",
            "Green",
            "Adams",
            "Baker",
            "Gonzalez",
            "Nelson",
            "Carter",
            "Mitchell",
            "Perez",
            "Roberts",
            "Turner",
            "Phillips",
            "Campbell",
            "Parker",
            "Evans",
            "Edwards",
            "Collins",
            "Stewart",
            "Sanchez",
            "Morris",
            "Rogers",
            "Reed",
            "Cook",
            "Morgan",
            "Bell",
            "Murphy",
            "Bailey",
            "Rivera",
            "Cooper",
            "Richardson",
            "Cox",
            "Howard",
            "Ward",
            "Torres",
            "Peterson",
            "Gray",
            "Ramirez",
            "James",
            "Watson",
            "Brooks",
            "Kelly",
            "Sanders",
            "Price",
            "Bennett",
            "Wood",
            "Barnes",
            "Ross",
            "Henderson",
            "Coleman",
            "Jenkins",
            "Perry",
            "Powell",
            "Long",
            "Patterson",
            "Hughes",
            "Flores",
            "Washington",
            "Butler",
            "Simmons",
            "Foster",
            "Gonzales",
            "Bryant",
            "Alexander",
            "Russell",
            "Griffin",
            "Diaz",
            "Hayes"
        };
    }
}