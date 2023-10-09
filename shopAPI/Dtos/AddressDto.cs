using System.ComponentModel.DataAnnotations;

namespace shopAPI.Dtos
{
    public class AddressDto
    {
        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;
        [Required]
        public string Street { get; set; } = null!;
        [Required]
        public string City { get; set; } = null!;
        [Required]
        public string ZipCode { get; set; } = null!;
    }
}
