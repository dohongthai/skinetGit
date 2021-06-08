namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        public Address()
        {
        }

        public Address(string firstName, string lastName, string street, string city, string sate, string zipCode)
        {
            FirstName = firstName;
            LastName = lastName;
            Street = street;
            City = city;
            Sate = sate;
            ZipCode = zipCode;
        }

        public string FirstName {get;set;}
        public string LastName {get;set;}
        public string Street {get;set;}
        public string City {get;set;}
        public string Sate {get;set;}
        public string ZipCode {get;set;}
    }
}