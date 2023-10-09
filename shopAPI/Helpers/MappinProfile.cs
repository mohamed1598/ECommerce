using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
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

            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>().ReverseMap();
            CreateMap<BasketItemDto, BasketItem>().ReverseMap();
        }
    }
}
