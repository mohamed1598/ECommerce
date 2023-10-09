using Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace shopAPI.Dtos
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; } = null!;
        public List<BasketItemDto> Items { get; set; } = new();
    }
}
