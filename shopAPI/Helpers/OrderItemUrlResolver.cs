using AutoMapper;
using Core.Entities.OrderAggregate;
using shopAPI.Dtos;

namespace shopAPI.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        public OrderItemUrlResolver(IConfiguration config)
        {
            Config = config;
        }

        public IConfiguration Config { get; }

        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                return Config["ApiUrl"] + source.ItemOrdered.PictureUrl;
            }
            return null;
        }
    }
}
