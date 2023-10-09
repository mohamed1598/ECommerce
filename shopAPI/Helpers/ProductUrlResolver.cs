using AutoMapper;
using Core.Entities;
using shopAPI.Dtos;

namespace shopAPI.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDTO, string>
    {
        private readonly IConfiguration _config;

        public ProductUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductToReturnDTO destination, string destMember, ResolutionContext context)
        {
            return !string.IsNullOrEmpty(source.PictureUrl) ? _config["ApiUrl"] + source.PictureUrl : string.Empty;
        }
    }
}
