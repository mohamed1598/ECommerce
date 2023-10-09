namespace Core.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public string ProductName { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string PictureUrl { get; set; } = null!;
        public string Brand { get; set; } = null!; 
        public string Type { get; set; } = null!;
    }
}