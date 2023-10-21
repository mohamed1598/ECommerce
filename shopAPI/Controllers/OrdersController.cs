using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using shopAPI.Dtos;
using shopAPI.Errors;
using shopAPI.Extensions;
using System.Security.Claims;

namespace shopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;

        public OrdersController(IOrderService orderService,IMapper mapper)
        {
            this.orderService = orderService;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetreiveEmailFromPrincipal();
            var address = mapper.Map<Address>(orderDto.ShipToAddress);
            var order = await orderService.CreateOrderAsync(email,orderDto.DeliveryMethodId,orderDto.BasketId,address);
            if (order == null)
                return BadRequest(new ApiResponse(400, "Proplem Createing Order"));
            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetreiveEmailFromPrincipal();
            var orders = await orderService.GetOrdersForUserAsync(email!);
            return Ok(mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetreiveEmailFromPrincipal();
            var order = await orderService.GetOrderByIdAsync(id, email!);
            if (order == null) return NotFound(new ApiResponse(404));

            return Ok(mapper.Map<OrderToReturnDto>(order));
        }
        [HttpGet("DeliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await orderService.GetDeliveryMethodAsync());
        }
    }
}
