using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;
using shopAPI.Dtos;

namespace shopAPI.Helpers
{
    public class MappinProfile : Profile
    {
        public MappinProfile()
        {
            CreateMap<Product, ProductToReturnDTO>()
                .ForMember(dest => dest.ProductBrand , opt => opt.MapFrom(src => src.ProductBrand!.Name))
                .ForMember(dest => dest.ProductType , opt => opt.MapFrom(src => src.ProductType!.Name))
                .ForMember(dest =>dest.PictureUrl, opt => opt.MapFrom<ProductUrlResolver>());

            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<Core.Entities.OrderAggregate.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>().ReverseMap();
            CreateMap<BasketItemDto, BasketItem>().ReverseMap();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d=> d.DeliveryMethod , o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice , o => o.MapFrom(s => s.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d=> d.ProductId , o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d=> d.ProductName , o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d=> d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                .ForMember(dest => dest.PictureUrl, opt => opt.MapFrom<OrderItemUrlResolver>());;

        }
    }
}
