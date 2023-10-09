using Core.Entities;

namespace shopAPI.Dtos
{
    public class ProductToReturnDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
        public string PictureUrl { get; set; } = null!;
        public string? ProductType { get; set; }
        public string? ProductBrand { get; set; }
    }
}
