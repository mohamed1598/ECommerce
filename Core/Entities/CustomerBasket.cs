using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CustomerBasket
    {
        public CustomerBasket() { }
        public CustomerBasket(string id) { 
            Id = id;
        }
        public string Id { get; set; } = null!;
        public int? DeliveryMethodId { get; set; }
        public string? ClientSecret { get; set; }
        public string? PaymentIntentId { get; set; }
        public decimal ShippingPrice { get; set; }
        public List<BasketItem> Items { get; set; } = new();
    }
}
