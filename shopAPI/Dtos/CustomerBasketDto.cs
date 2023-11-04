﻿using Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace shopAPI.Dtos
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; } = null!;
        public int? DeliveryMethodId { get; set; }
        public string? ClientSecret { get; set; }
        public string? PaymentIntentId { get; set; }
        public decimal ShippingPrice { get; set; }
        public List<BasketItemDto> Items { get; set; } = new();
    }
}
